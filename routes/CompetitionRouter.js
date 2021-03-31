***REMOVED***
***REMOVED***
 * @Date: 2021-03-25 20:27:55
***REMOVED***

import { Router ***REMOVED*** from "express";
import CompetitionService from "../service/CompetitionService.js";
import TypeService from "../service/TypeService.js";

const router = Router();
const competitionService = new CompetitionService();
const typeService = new TypeService();

***REMOVED****
 * @description 添加竞赛
 * @param {name, url, detail, image, type[]***REMOVED***
 * @url /competition/add
 * @return {***REMOVED***
***REMOVED***
router.post("/add", async function (req, res, next) {
    // 从cookie中获取当前登录教师的id
    const teaId = req.signedCookies.id;
    // 获取传递的参数
    const competition = req.body;
    // 获取当前时间
    const date = new Date();
***REMOVED***
        const result = await competitionService.add({
            name: competition.name,
            url: competition.url,
            detail: competition.detail,
            image: competition.image,
            teaId: teaId,
            date: date,
        ***REMOVED***
        // 添加竞赛类型
        const types = await typeService.add({
            comId: result,
            type: competition.type,
        ***REMOVED***
        res.json({
            code: "0",
            msg: "添加成功",
            id: result,
            type: types,
        ***REMOVED***
***REMOVED***
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        ***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED****
 * @description 删除竞赛
 * @param {id***REMOVED***
 * @url /competition/delete
 * @return {***REMOVED***
***REMOVED***
router.delete("/delete", async function (req, res, next) {
    // 获取传递的参数
    const competition = req.query;
***REMOVED***
        const result = await competitionService.delete(competition);
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
 * @description 更新竞赛
 * @param {id, name, url, detail, image, teaId, type[]***REMOVED***
 * @url /competition/update
 * @return {***REMOVED***
***REMOVED***
router.put("/update", async function (req, res, next) {
    // 从cookie中获取当前登录教师的id
    const teaId = req.signedCookies.id;
    // 获取传递的参数
    const competition = req.body;
***REMOVED***
        const result = await competitionService.update({
            id: competition.id,
            name: competition.name,
            url: competition.url,
            detail: competition.detail,
            image: competition.image,
            teaId: teaId,
        ***REMOVED***
        // 更新竞赛种类
        const types = await typeService.update({
            comId: competition.id,
            type: competition.type,
        ***REMOVED***
        res.json({
            code: "0",
            msg: result,
            type: types,
        ***REMOVED***
***REMOVED***
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        ***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED****
 * @description 根据id查找竞赛
 * @param {id***REMOVED***
 * @url /competition/findOneById
 * @return {competition***REMOVED***
***REMOVED***
router.get("/findOneById", async function (req, res, next) {
    // 获取传递的参数
    const competition = req.query;
***REMOVED***
        const result = await competitionService.findOneById(competition);
        res.send(result);
***REMOVED***
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        ***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED****
 * @description 根据name查找竞赛
 * @param {name***REMOVED***
 * @url /competition/findOneByName
 * @return {competition***REMOVED***
***REMOVED***
router.get("/findOneByName", async function (req, res, next) {
    // 获取传递的参数
    const competition = req.query;
***REMOVED***
        const result = await competitionService.findOneByName(competition);
        res.send(result);
***REMOVED***
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        ***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED****
 * @description 查找所有竞赛
 * @param {***REMOVED***
 * @url /competition/findAll
 * @return {competition[]***REMOVED***
***REMOVED***
router.get("/findAll", async function (req, res, next) {
    res.send(await competitionService.findAll());
***REMOVED***

export default router;
