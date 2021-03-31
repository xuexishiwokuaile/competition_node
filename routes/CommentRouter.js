/*
 * @Author: chenanran
 * @Date: 2021-03-31 14:22:16
 */

import { Router } from "express";
import CommentService from "../service/CommentService.js";

const router = Router();
const commentService = new CommentService();

/**
 * @description 添加评论
 * @param {comId, detail}
 * @url /comment/add
 * @return {}
 */
router.post("/add", async function (req, res, next) {
    // 从cookie中读取当前登录学生的id
    const stuId = req.signedCookies.id;
    // 读取请求参数
    const comment = req.body;
    // 获取当前时间
    const date = new Date();
    try {
        const result = await commentService.add({
            comId: comment.comId,
            stuId: stuId,
            detail: comment.detail,
            date: date,
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
 * @description 删除评论
 * @param {id}
 * @url /comment/delete
 * @return {}
 */
router.delete("/delete", async function (req, res, next) {
    // 读取请求参数
    const comment = req.query;
    try {
        const result = await commentService.delete(comment);
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
 * @description 更新评论
 * @param {detail, id}
 * @url /comment/update
 * @return {}
 */
router.put("/update", async function (req, res, next) {
    // 读取请求参数
    const comment = req.body;
    try {
        const result = await commentService.update(comment);
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
 * @description 根据id查找评论
 * @param {id}
 * @url /comment/findOneById
 * @return {}
 */
router.get("/findOneById", async function (req, res, next) {
    // 读取请求参数
    const comment = req.query;
    try {
        const result = await commentService.findOneById(comment);
        res.send(result);
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

/**
 * @description 查找某一学生发表的评论
 * @param {}
 * @url /comment/findOneByStu
 * @return {}
 */
router.get("/findOneByStu", async function (req, res, next) {
    // 从cookie中读取当前登录学生的id
    const stuId = req.signedCookies.id;
    try {
        const result = await commentService.findOneByStu({ stuId: stuId });
        res.send(result);
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

/**
 * @description 查找某一竞赛下的评论
 * @param {comId}
 * @url /comment/findOneByCom
 * @return {}
 */
router.get("/findOneByCom", async function (req, res, next) {
    // 读取请求参数
    const comment = req.query;
    try {
        const result = await commentService.findOneByCom(comment);
        res.send(result);
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

export default router;
