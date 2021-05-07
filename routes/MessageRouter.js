/*
 * @Author: chenanran
 * @Date: 2021-03-30 11:40:15
 */

import { Router } from "express";
import MessageService from "../service/MessageService.js";
import eventEmitter from "../util/EventEmitter.js";
import expressWs from "express-ws";
import { redisCache } from "../middleWare/RedisCache.js";
import { sortData } from "../util/sort.js";

const router = Router();
const messageService = new MessageService();

// 让router支持websocket
expressWs(router);

// 连接池，根据用户的id记录websocket的所有客户端
const wsClients = {};
router.wsClients = wsClients;

/**
 * @description 发布消息
 * @param {comId, detail}
 * @url /message/add
 * @return {}
 */
router.post("/add", async function (req, res, next) {
    // 从cookie中获取当前登录教师的id
    const teaId = req.signedCookies.id;
    // 读取请求参数
    const message = req.body;
    try {
        const result = await messageService.add({
            comId: message.comId,
            teaId: teaId,
            detail: message.detail,
        });
        res.json({
            code: "0",
            msg: "添加成功",
            id: result,
        });
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

/**
 * @description 删除消息
 * @param {id} 多个id，使用逗号分隔
 * @url /message/delete
 * @return {}
 */
router.delete("/delete", async function (req, res, next) {
    // 读取请求参数
    const id = req.query.id;
    const ids = id.split(",");
    try {
        const result = await messageService.delete({
            ids: ids,
        });
        res.json({
            code: "0",
            msg: result,
        });
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

/**
 * @description 更新消息
 * @param {detail, id[]}
 * @url /message/update
 * @return {}
 */
router.put("/update", async function (req, res, next) {
    // 读取请求参数
    const message = req.body;
    try {
        const result = await messageService.update({
            detail: message.detail,
            ids: message.id,
        });
        res.json({
            code: "0",
            msg: result,
        });
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

/**
 * @description 更新消息的阅读状态
 * @param {isRead, id} isRead: true/false
 * @url /message/updateRead
 * @return {}
 */
router.put("/updateRead", async function (req, res, next) {
    // 读取请求参数
    const message = req.body;
    try {
        const result = await messageService.updateRead(message);
        res.json({
            code: "0",
            msg: result,
        });
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

/**
 * @description 查找某一教师发布的关于某一竞赛的信息
 * @param {comId}
 * @url /message/findOneByComAndTea
 * @return {}
 */
router.get("/findOneByComAndTea", async function (req, res, next) {
    // 从cookie中获取当前登录教师的id
    const teaId = req.signedCookies.id;
    // 读取请求参数
    const message = req.query;
    try {
        const result = await messageService.findOneByComAndTea({
            comId: message.comId,
            teaId: teaId,
        });
        res.send(result);
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

/**
 * @description 查找某一教师发布的所有信息
 * @param {}
 * @url /message/findOneByTea
 * @return {}
 */
router.get("/findOneByTea", async function (req, res, next) {
    // 从cookie中获取当前登录教师的id
    const teaId = req.signedCookies.id;
    try {
        let result = await messageService.findOneByTea({ teaId: teaId });
        // 排序
        if (req.query.sorter) {
            const sorter = JSON.parse(req.query.sorter);
            result = sortData(result, sorter);
        }
        res.send({
            data: result,
            success: true,
        });
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

/**
 * @description websocket连接
 * @param {}
 * @return {}
 */
router.ws("/ws", redisCache, function (ws, req, next) {
    const { id } = req.query;
    if (!wsClients[id]) {
        wsClients[id] = [];
    }
    // 将连接记录在连接池中
    wsClients[id].push(ws);
    ws.onclose = () => {
        // 连接关闭时，wsClients进行清理
        wsClients[id] = wsClients[id].filter((client) => {
            return client !== ws;
        });
        if (wsClients[id].length === 0) {
            delete wsClients[id];
        }
    };
});

// 监听message表的新增事件(newMessage)，将消息发送给新增的用户
eventEmitter.on("newMessage", async function (stuId) {
    if (wsClients[stuId] !== undefined) {
        wsClients[stuId].forEach(async (client) => {
            // 获取该学生的所有消息
            const message = await messageService.findOneByStu({ stuId: stuId });
            // 不能直接发送json对象，需要先转化成字符串
            client.send(JSON.stringify(message));
        });
    } else {
        console.log(`信息发送失败，用户${stuId}当前处于离线状态`);
    }
});

/**
 * @description 查找某一学生的所有消息
 * @description 使用websocket发送数据
 * @param {}
 * @url /message/findOneByStu
 * @return {}
 */
router.get("/findOneByStu", async function (req, res, next) {
    // 从cookie中获取当前登录学生的id
    const stuId = req.signedCookies.id;
    try {
        const result = await messageService.findOneByStu({ stuId: stuId });
        if (wsClients[stuId] !== undefined) {
            wsClients[stuId].forEach((client) => {
                client.send(JSON.stringify(result));
            });
            res.json({
                code: "0",
                msg: "success",
            });
        } else {
            // 如果消息接收方没有连接，则返回错误信息
            res.json({
                code: "1",
                msg: "用户当前不在线",
            });
        }
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

/**
 * @description 查找某一名学生的已读消息
 * @param {}
 * @url /message/findReadByStu
 * @return {Promise}
 */
router.get("/findReadByStu", async function (req, res, next) {
    // 从cookie中获取当前登录学生的id
    const stuId = req.signedCookies.id;
    try {
        const result = await messageService.findReadByStu({ stuId: stuId });
        res.send(result);
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

/**
 * @description 查找某一名学生的未读消息
 * @param {}
 * @url /message/findUnreadByStu
 * @return {Promise}
 */
router.get("/findUnreadByStu", async function (req, res, next) {
    // 从cookie中获取当前登录学生的id
    const stuId = req.signedCookies.id;
    try {
        const result = await messageService.findUnreadByStu({ stuId: stuId });
        res.send(result);
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

/**
 * @description 查找学生所选一门竞赛的消息
 * @param {comId}
 * @url /message/findOneByComAndStu
 * @return {}
 */
router.get("/findOneByComAndStu", async function (req, res, next) {
    // 从cookie中获取当前登录学生的id
    const stuId = req.signedCookies.id;
    // 读取请求参数
    const message = req.query;
    try {
        const result = await messageService.findOneByComAndStu({
            comId: message.comId,
            stuId: stuId,
        });
        res.send(result);
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

export default router;
