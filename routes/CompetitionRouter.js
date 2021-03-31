/*
 * @Author: chenanran
 * @Date: 2021-03-25 20:27:55
 */

import { Router } from "express";
import CompetitionService from "../service/CompetitionService.js";
import TypeService from "../service/TypeService.js";

const router = Router();
const competitionService = new CompetitionService();
const typeService = new TypeService();

/**
 * @description 添加竞赛
 * @param {name, url, detail, image, type[]}
 * @url /competition/add
 * @return {}
 */
router.post("/add", async function (req, res, next) {
    // 从cookie中获取当前登录教师的id
    const teaId = req.signedCookies.id;
    // 获取传递的参数
    const competition = req.body;
    // 获取当前时间
    const date = new Date();
    try {
        const result = await competitionService.add({
            name: competition.name,
            url: competition.url,
            detail: competition.detail,
            image: competition.image,
            teaId: teaId,
            date: date,
        });
        // 添加竞赛类型
        const types = await typeService.add({
            comId: result,
            type: competition.type,
        });
        res.json({
            code: "0",
            msg: "添加成功",
            id: result,
            type: types,
        });
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

/**
 * @description 删除竞赛
 * @param {id}
 * @url /competition/delete
 * @return {}
 */
router.delete("/delete", async function (req, res, next) {
    // 获取传递的参数
    const competition = req.query;
    try {
        const result = await competitionService.delete(competition);
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
 * @description 更新竞赛
 * @param {id, name, url, detail, image, teaId, type[]}
 * @url /competition/update
 * @return {}
 */
router.put("/update", async function (req, res, next) {
    // 从cookie中获取当前登录教师的id
    const teaId = req.signedCookies.id;
    // 获取传递的参数
    const competition = req.body;
    try {
        const result = await competitionService.update({
            id: competition.id,
            name: competition.name,
            url: competition.url,
            detail: competition.detail,
            image: competition.image,
            teaId: teaId,
        });
        // 更新竞赛种类
        const types = await typeService.update({
            comId: competition.id,
            type: competition.type,
        });
        res.json({
            code: "0",
            msg: result,
            type: types,
        });
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

/**
 * @description 根据id查找竞赛
 * @param {id}
 * @url /competition/findOneById
 * @return {competition}
 */
router.get("/findOneById", async function (req, res, next) {
    // 获取传递的参数
    const competition = req.query;
    try {
        const result = await competitionService.findOneById(competition);
        res.send(result);
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

/**
 * @description 根据name查找竞赛
 * @param {name}
 * @url /competition/findOneByName
 * @return {competition}
 */
router.get("/findOneByName", async function (req, res, next) {
    // 获取传递的参数
    const competition = req.query;
    try {
        const result = await competitionService.findOneByName(competition);
        res.send(result);
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

/**
 * @description 查找所有竞赛
 * @param {}
 * @url /competition/findAll
 * @return {competition[]}
 */
router.get("/findAll", async function (req, res, next) {
    res.send(await competitionService.findAll());
});

export default router;
