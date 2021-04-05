/*
 * @Author: chenanran
 * @Date: 2021-04-02 17:05:26
 */

import { Router } from "express";
import ApplyService from "../service/ApplyService.js";

const router = Router();
const applyService = new ApplyService();

/**
 * @description 申请组队
 * @param {teamId, captain, member, memPositionName, reason}
 * @url /apply/add
 * @return {}
 */
router.post("/add", async function (req, res, next) {
    // 从cookie中获取当前登录学生的id
    const member = req.signedCookies.id;
    // 读取请求参数
    const apply = req.body;
    try {
        const result = await applyService.add({
            teamId: apply.teamId,
            captain: apply.captain,
            member: apply.member,
            memPositionName: apply.memPositionName,
            reason: apply.reason,
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
 * @description 取消组队申请或退出小队
 * @param {teamId}
 * @url /apply/delete
 * @return {}
 */
router.delete("/delete", async function (req, res, next) {
    // 从cookie中获取当前登录学生的id
    const stuId = req.signedCookies.id;
    // 读取请求参数
    const team = req.query;
    try {
        const result = await applyService.delete({
            teamId: team.teamId,
            stuId: stuId,
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
 * @description 同意组队申请
 * @param {member, teamId}
 * @url /apply/updateStatusConfirm
 * @return {}
 */
router.put("/updateStatusConfirm", async function (req, res, next) {
    // 从cookie中获取当前登录学生的id
    const captain = req.signedCookies.id;
    // 读取请求参数
    const apply = req.body;
    try {
        const result = await applyService.updateStatusConfirm({
            captain: captain,
            member: apply.member,
            teamId: apply.teamId,
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
 * @description 拒绝组队申请
 * @param {member, teamId}
 * @url /apply/updateStatusRefuse
 * @return {}
 */
router.put("/updateStatusRefuse", async function (req, res, next) {
    // 从cookie中获取当前登录学生的id
    const captain = req.signedCookies.id;
    // 读取请求参数
    const apply = req.body;
    try {
        const result = await applyService.updateStatusRefuse({
            captain: captain,
            member: apply.member,
            teamId: apply.teamId,
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
 * @description 学生查看自己所有的组队情况
 * @param {}
 * @url /apply/findTeamByStu
 * @return {}
 */
router.get("/findTeamByStu", async function (req, res, next) {
    // 从cookie中获取当前登录学生的id
    const stuId = req.signedCookies.id;
    try {
        const result = await applyService.findTeamByStu({
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

/**
 * @description 队员查看自己提交的组队申请
 * @param {}
 * @url /apply/findApply
 * @return {}
 */
router.get("/findApply", async function (req, res, next) {
    // 从cookie中获取当前登录学生的id
    const member = req.signedCookies.id;
    try {
        const result = await applyService.findApply({
            member: member,
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
 * @description 队长查看自己收到的组队申请
 * @param {}
 * @url /apply/findReceive
 * @return {}
 */
router.get("/findReceive", async function (req, res, next) {
    // 从cookie中获取当前登录学生的id
    const captain = req.signedCookies.id;
    try {
        const result = await applyService.findReceive({ captain: captain });
        res.send(result);
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

export default router;
