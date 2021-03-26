/*
 * @Author: chenanran
 * @Date: 2021-03-25 20:27:55
 */

import { Router } from "express";
import CompetitionService from "../service/CompetitionService.js";

const router = Router();
const competitionService = new CompetitionService();

/**
 * @description 添加竞赛
 * @param {name, url, detail, image}
 * @url /competition/add
 * @return {}
 */
router.post("/add", async function (req, res, next) {
    // 获取传递的参数
    const competition = req.body;
    try {
        const result = await competitionService.add(competition);
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
 * @param {id, name, url, detail, image}
 * @url /competition/update
 * @return {}
 */
router.put("/update", async function (req, res, next) {
    // 获取传递的参数
    const competition = req.body;
    try {
        const result = await competitionService.update(competition);
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
 * @description 根据id查找竞赛
 * @param {id}
 * @url /competition/findOneById
 * @return {competition}
 */
router.get("/findOneById", async function (req, res, next) {
    // 获取传递的参数
    const competition = req.query;
    res.send(await competitionService.findOneById(competition));
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
    res.send(await competitionService.findOneByName(competition));
});

/**
 * @description 查找所有竞赛
 * @param {}
 * @url /competition/findAll
 * @return {[competition]}
 */
router.get("/findAll", async function (req, res, next) {
    res.send(await competitionService.findAll());
});

export default router;
