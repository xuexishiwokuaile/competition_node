/*
 * @Author: chenanran
 * @Date: 2021-03-25 20:27:55
 */

import { Router } from "express";
import CompetitionService from "../service/CompetitionService.js";
import TypeService from "../service/TypeService.js";
import { putStream } from "../util/oss.js";
import formidable from "formidable";
import { intersection } from "../util/arrayUtil.js";

const router = Router();
const competitionService = new CompetitionService();
const typeService = new TypeService();

/**
 * @description 添加竞赛
 * @param {name, url, detail, image, typeName} // typeName之间用逗号分隔 image格式为file
 * @url /competition/add
 * @return {}
 */
router.post("/add", async function (req, res, next) {
    // 从cookie中获取当前登录教师的id
    const teaId = req.signedCookies.id;
    // 获取传递的参数，其中包含图片，格式为form-data
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        if (err) {
            res.json({
                code: "1",
                msg: err,
            });
        }
        // 将文件上传到oss
        const img = await putStream(files.image);
        // 如果没有上传文件，url则为空，否则为文件的oss地址
        const url = img ? img.url : null;
        // 获取参数
        const competition = fields;
        // 获取当前时间
        const date = new Date();
        // 格式化type
        const typeName = competition.typeName.split(",");

        try {
            const result = await competitionService.add({
                name: competition.name,
                url: competition.url,
                detail: competition.detail,
                image: url,
                teaId: teaId,
                date: date,
            });
            // 添加竞赛类型
            const types = await typeService.add({
                comId: result,
                typeName: typeName,
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
});

/**
 * @description 删除竞赛
 * @param {id} // 支持批量删除
 * @url /competition/delete
 * @return {}
 */
router.delete("/delete", async function (req, res, next) {
    // 从cookie中读取当前登录教师的id
    const teaId = req.signedCookies.id;
    // 获取传递的参数
    const competition = req.query;
    // 将id解析成数组
    const id = competition.id.split(",");
    try {
        const result = await competitionService.delete({
            id: id,
            teaId: teaId,
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
 * @description 更新竞赛
 * @param {id, name, url, detail, image, teaId, typeName} // typeName之间用逗号分隔 image格式为file
 * @url /competition/update
 * @return {}
 */
router.put("/update", async function (req, res, next) {
    // 从cookie中获取当前登录教师的id
    const teaId = req.signedCookies.id;
    // 获取传递的参数，其中包含图片，格式为form-data
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        if (err) {
            res.json({
                code: "1",
                msg: err,
            });
        }
        // 将文件上传到oss
        const img = await putStream(files.image);
        // 如果没有上传文件，url则为空，否则为文件的oss地址
        const url = img ? img.url : null;
        // 获取参数
        const competition = fields;
        // 格式化type
        const typeName = competition.typeName.split(",");

        try {
            const result = await competitionService.update({
                id: competition.id,
                name: competition.name,
                url: competition.url,
                detail: competition.detail,
                image: url,
                teaId: teaId,
            });
            // 更新竞赛种类
            const types = await typeService.update({
                comId: competition.id,
                typeName: typeName,
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
 * @description 查找某一个教师创建的所有竞赛
 * @param {teaId}
 * @url /competition/findOneByTeaId
 * @return {Promise}
 */
router.get("/findOneByTeaId", async function (req, res, next) {
    // 从cookie中获取当前登录教师的id
    const { teaId } = req.query;
    try {
        const result = await competitionService.findOneByTeaId({
            teaId: teaId,
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
 * @description 查找所有竞赛，并按指定的方式排序
 * @param {typeName, teaId, order}
 * @url /competition/findAll
 * @return {competition[]}
 */
router.get("/findAll", async function (req, res, next) {
    // 获取请求参数
    const { typeName, teaId, order } = req.query;
    const resultArr = [];
    const allResult = await competitionService.findAll({ order: order });
    resultArr.push(allResult);
    if (typeName) {
        const typeResult = await typeService.findComByType({
            typeName: typeName.split(","),
            order: order,
        });
        resultArr.push(typeResult);
    }
    if (teaId) {
        const teaResult = await competitionService.findOneByTeaId({
            teaId: teaId,
            order: order,
        });
        resultArr.push(teaResult);
    }
    // 取交集
    res.send(intersection(resultArr));
});

/**
 * @description 查找竞赛的所有者
 * @param {}
 * @url /competition/findAllOwners
 * @return {}
 */
router.get("/findAllOwners", async function (req, res, next) {
    res.send(await competitionService.findAllOwners());
});

export default router;
