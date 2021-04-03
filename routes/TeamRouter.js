/*
 * @Author: chenanran
 * @Date: 2021-04-03 17:03:55
 */

import { Router } from "express";
import TeamService from "../service/TeamService.js";

const router = Router();
const teamService = new TeamService();

/**
 * @description 发起组队招募
 * @param {positionName, comId, name, detail, count} // count为json对象
 * @url /team/add
 * @return {}
 */
router.post("/add", async function (req, res, next) {
    // 从cookie中读取当前登录用户的id
    const captain = req.signedCookies.id;
    // 读取请求参数
    const team = req.body;
    // 得到当前日期
    const date = new Date();

    try {
        const result = await teamService.add({
            captain: team.captain,
            positionName: team.positionName,
            comId: team.comId,
            name: team.name,
            detail: team.detail,
            date: date,
            count: team.count,
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
 * @description 取消组队招募/解散团队
 * @param {teamId, captain}
 * @url /team/delete
 * @return {}
 */
router.delete("/delete", async function (req, res, next) {
    // 从cookie中读取当前登陆用户的id
    const captain = req.signedCookies.id;
    // 读取请求参数
    const team = req.query;

    try {
        const result = await teamService.delete({
            teamId: team.teamId,
            captain: captain,
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
 * @description 查看所有团队信息
 * @param {}
 * @url /team/findAll
 * @return {}
 */
router.get("/findAll", async function (req, res, next) {
    try {
        const result = await teamService.findAll();
        res.send(result);
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

/**
 * @description 查看还缺人的团队信息
 * @description 排序规则：竞赛的热度hot和团队总的所缺人数missing，计算规则：hot/missing
 * @param {}
 * @url /team/findMissing
 * @return {}
 */
router.get("/findMissing", async function (req, res, next) {
    try {
        const result = await teamService.findMissing();
        res.send(result);
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

/**
 * @description 查看已经完成组队（不缺人）的团队信息
 * @param {}
 * @url /team/findFinished
 * @return {}
 */
router.get("/findFinished", async function (req, res, next) {
    try {
        const result = await teamService.findFinished();
        res.send(result);
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

export default router;
