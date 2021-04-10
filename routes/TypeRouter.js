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
 * @description 根据单个或多个种类查找竞赛
 * @param {typeName, order} // 多个name，使用逗号分隔
 * @url /type/findComByType
 * @return {competition[]}
 */
router.get("/findComByType", async function (req, res, next) {
    // 将前端传递的参数解析成数组
    const type = req.query;
    const types = type.typeName.split(",");
    try {
        const result = await typeService.findComByType({
            typeName: types,
            order: type.order,
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
 * @description 查看竞赛的所有种类
 * @param {}
 * @url /type/findAll
 * @return {}
 */
router.get("/findAll", async function (req, res, next) {
    try {
        const result = await typeService.findAll();
        res.send(result);
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

export default router;
