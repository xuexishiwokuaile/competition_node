/*
 * @Author: chenanran
 * @Date: 2021-03-30 11:40:15
 */

import { Router } from "express";
import MessageService from "../service/MessageService.js";

const router = Router();
const messageService = new MessageService();

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
 * @description 查找某一学生的所有消息
 * @param {}
 * @url /message/findOneByStu
 * @return {}
 */
router.get("/findOneByStu", async function (req, res, next) {
    // 从cookie中获取当前登录学生的id
    const stuId = req.signedCookies.id;
    try {
        const result = await messageService.findOneByStu({ stuId: stuId });
        res.send(result);
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
