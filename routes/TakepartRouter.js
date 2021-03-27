/*
 * @Author: chenanran
 * @Date: 2021-03-26 19:48:38
 */

import { Router } from "express";
import TakepartService from "../service/TakepartService.js";

const router = Router();
const takePartService = new TakepartService();

/**
 * @description 学生选择竞赛
 * @param {comId}
 * @url /takepart/add
 * @return {}
 */
router.post("/add", async function (req, res, next) {
    // 从cookie中获取stuId
    const stuId = req.signedCookies.id;
    // 读取请求参数
    const comId = req.body.comId;
    try {
        const result = await takePartService.add({
            stuId: stuId,
            comId: comId,
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
 * @description 学生放弃竞赛
 * @param {comId}
 * @url /takepart/delete
 * @return {}
 */
router.delete("/delete", async function (req, res, next) {
    // 从cookie中获取stuId
    const stuId = req.signedCookies.id;
    // 读取请求参数
    const comId = req.query.comId;

    try {
        const result = await takePartService.delete({
            stuId: stuId,
            comId: comId,
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
 * @description 获取学生选择的竞赛
 * @param {}
 * @url /takepart/findComByStuId
 * @return {}
 */
router.get("/findComByStuId", async function (req, res, next) {
    // 从cookie中获取stuId
    const stuId = req.signedCookies.id;

    try {
        const result = await takePartService.findComByStuId({ stuId: stuId });
        res.send(result);
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

export default router;
