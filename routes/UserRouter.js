/*
 * @Author: chenanran
 * @Date: 2021-03-25 00:01:05
 */

import { Router } from "express";
import UserService from "../service/userService.js";

const router = Router();

const userService = new UserService();

/**
 * @description 删除用户
 * @param {id}
 * @url /user/delete
 * @return {}
 */
router.delete("/delete", async function (req, res, next) {
    // 获取传递的参数
    var user = req.query;
    // userService.delete(user).then(
    //     (result) => {
    //         res.json({
    //             code: "0",
    //             msg: result,
    //         });
    //     },
    //     (e) => {
    //         res.json({
    //             code: "1",
    //             msg: e.name + ": " + e.message,
    //         });
    //     }
    // );

    try {
        var result = await userService.delete(user);
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
 * @description 更新用户密码
 * @param {id, password}
 * @url /user/updatePassword
 * @return {}
 */
router.put("/updatePassword", async function (req, res, next) {
    // 获取传递的参数
    var user = req.body;
    try {
        var result = await userService.updatePassword(user);
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
 * @description 根据id查找用户
 * @param {id}
 * @url /user/findOneById
 * @return {user}
 */
router.get("/findOneById", async function (req, res, next) {
    // 获取传递的参数
    var user = req.query;
    try {
        const result = await userService.findOneById(user);
        res.send(result);
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

/**
 * @description 根据name查找用户
 * @param {name}
 * @url /user/findOneByName
 * @return {user}
 */
router.get("/findOneByName", async function (req, res, next) {
    var user = req.query;
    res.send(await userService.findOneByName(user));
});

/**
 * @description 查找所有用户
 * @param {}
 * @url /user/findAll
 * @return {[user]}
 */
router.get("/findAll", async function (req, res, next) {
    res.send(await userService.findAll());
});

export default router;
