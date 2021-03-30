/*
 * @Author: chenanran
 * @Date: 2021-03-27 17:53:15
 */

import { Router } from "express";
import TypeService from "../service/TypeService.js";

const router = Router();
const typeService = new TypeService();

/**
 * @description 查找某一竞赛包含的种类
 * @param {comId}
 * @url /type/findTypeByCom
 * @return {type}
 */
router.get("/findTypeByCom", async function (req, res, next) {
    // 获取传递的参数
    const type = req.query;
    try {
        const result = await typeService.findTypeByCom(type);
        res.send(result);
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

/**
 * @description 查找某一种类下的所有竞赛
 * @param {typeId}
 * @url /type/findComByType
 * @return {competition}
 */
router.get("/findComByType", async function (req, res, next) {
    // 获取传递的参数
    const type = req.query;
    try {
        const result = await typeService.findComByType(type);
        res.send(result);
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

/**
 * @description 查找同属于多个种类的竞赛
 * @param {typeId} // 多个id，使用逗号分隔 eg: 1,2,3
 * @url /type/findComByMultiTypes
 * @return {competition[]}
 */
router.get("/findComByMultiTypes", async function (req, res, next) {
    // 将前端传递的参数解析成数组
    const typeId = req.query.typeId;
    const types = typeId.split(",");
    try {
        const result = await typeService.findComByMultiTypes(types);
        res.send(result);
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

export default router;
