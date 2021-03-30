***REMOVED***
***REMOVED***
 * @Date: 2021-03-26 19:48:38
***REMOVED***

import { Router ***REMOVED*** from "express";
import TakepartService from "../service/TakepartService.js";

const router = Router();
const takePartService = new TakepartService();

***REMOVED****
 * @description 学生选择竞赛
 * @param {comId***REMOVED***
 * @url /takepart/add
 * @return {***REMOVED***
***REMOVED***
router.post("/add", async function (req, res, next) {
    // 从cookie中获取stuId
    const stuId = req.signedCookies.id;
    // 读取请求参数
    const comId = req.body.comId;
***REMOVED***
        const result = await takePartService.add({
            stuId: stuId,
            comId: comId,
        ***REMOVED***
        res.json({
            code: "0",
            msg: "添加成功",
            id: result,
        ***REMOVED***
***REMOVED***
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        ***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED****
 * @description 学生放弃竞赛
 * @param {comId***REMOVED***
 * @url /takepart/delete
 * @return {***REMOVED***
***REMOVED***
router.delete("/delete", async function (req, res, next) {
    // 从cookie中获取stuId
    const stuId = req.signedCookies.id;
    // 读取请求参数
    const comId = req.query.comId;

***REMOVED***
        const result = await takePartService.delete({
            stuId: stuId,
            comId: comId,
        ***REMOVED***
        res.json({
            code: "0",
            msg: result,
        ***REMOVED***
***REMOVED***
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        ***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED****
 * @description 获取学生选择的竞赛
 * @param {***REMOVED***
 * @url /takepart/findComByStuId
 * @return {***REMOVED***
***REMOVED***
router.get("/findComByStuId", async function (req, res, next) {
    // 从cookie中获取stuId
    const stuId = req.signedCookies.id;

***REMOVED***
        const result = await takePartService.findComByStuId({ stuId: stuId ***REMOVED***
        res.send(result);
***REMOVED***
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        ***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED****
 * @description 查看选择某一竞赛的所有学生
 * @param {comId***REMOVED***
 * @url /takepart/findStuByCom
 * @return {***REMOVED***
***REMOVED***
router.get("/findStuByCom", async function (req, res, next) {
    // 获取参数
    const takepart = req.query;
***REMOVED***
        const result = await takePartService.findStuByCom(takepart);
        res.send(result);
***REMOVED***
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        ***REMOVED***
***REMOVED***
***REMOVED***

export default router;
