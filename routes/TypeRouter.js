***REMOVED***
***REMOVED***
 * @Date: 2021-03-27 17:53:15
***REMOVED***

import { Router ***REMOVED*** from "express";
import TypeService from "../service/TypeService.js";

const router = Router();
const typeService = new TypeService();

***REMOVED****
 * @description 查找某一竞赛包含的种类
 * @param {comId***REMOVED***
 * @url /type/findTypeByCom
 * @return {type***REMOVED***
***REMOVED***
router.get("/findTypeByCom", async function (req, res, next) {
    // 获取传递的参数
    const type = req.query;
***REMOVED***
        const result = await typeService.findTypeByCom(type);
        res.send(result);
***REMOVED***
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        ***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED****
 * @description 查找某一种类下的所有竞赛
 * @param {typeId***REMOVED***
 * @url /type/findComByType
 * @return {competition***REMOVED***
***REMOVED***
router.get("/findComByType", async function (req, res, next) {
    // 获取传递的参数
    const type = req.query;
***REMOVED***
        const result = await typeService.findComByType(type);
        res.send(result);
***REMOVED***
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        ***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED****
 * @description 查找同属于多个种类的竞赛
 * @param {typeId[]***REMOVED***
 * @url /type/findComByMultiTypes
 * @return {competition[]***REMOVED***
***REMOVED***
router.get("/findComByMultiTypes", async function (req, res, next) {
    // 将前端传递的参数解析成数组
    const typeId = req.query.typeId;
    const types = typeId.split(",");
***REMOVED***
        const result = await typeService.findComByMultiTypes(types);
        res.send(result);
***REMOVED***
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        ***REMOVED***
***REMOVED***
***REMOVED***

export default router;
