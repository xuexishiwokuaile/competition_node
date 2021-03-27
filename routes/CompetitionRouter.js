***REMOVED***
***REMOVED***
 * @Date: 2021-03-25 20:27:55
***REMOVED***

import { Router ***REMOVED*** from "express";
import CompetitionService from "../service/CompetitionService.js";

const router = Router();
const competitionService = new CompetitionService();

***REMOVED****
 * @description 添加竞赛
 * @param {name, url, detail, image***REMOVED***
 * @url /competition/add
 * @return {***REMOVED***
***REMOVED***
router.post("/add", async function (req, res, next) {
    // 获取传递的参数
    const competition = req.body;
***REMOVED***
        const result = await competitionService.add(competition);
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
 * @param {id, name, url, detail, image***REMOVED***
 * @url /competition/update
 * @return {***REMOVED***
***REMOVED***
router.put("/update", async function (req, res, next) {
    // 获取传递的参数
    const competition = req.body;
***REMOVED***
        const result = await competitionService.update(competition);
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
    res.send(await competitionService.findOneByName(competition));
***REMOVED***

***REMOVED****
 * @description 查找所有竞赛
 * @param {***REMOVED***
 * @url /competition/findAll
 * @return {[competition]***REMOVED***
***REMOVED***
router.get("/findAll", async function (req, res, next) {
    res.send(await competitionService.findAll());
***REMOVED***

export default router;
