/*
 * @Author: chenanran
 * @Date: 2021-03-25 00:01:05
 */

import { Router } from "express";
import UserService from "../service/UserService.js";
import { putStream } from "../util/oss.js";
import formidable from "formidable";

const router = Router();

const userService = new UserService();

/**
 * @description 删除用户 注销账号，只有用户本人能操作
 * @param {}
 * @url /user/delete
 * @return {}
 */
router.delete("/delete", async function (req, res, next) {
    // 从cookie中读取当前登录用户的的id
    const id = req.signedCookies.id;
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
        var result = await userService.delete({ id: id });
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
 * @param {password}
 * @url /user/updatePassword
 * @return {}
 */
router.put("/updatePassword", async function (req, res, next) {
    // 从cookie中获取当前登录用户的id
    const id = req.signedCookies.id;
    // 获取传递的参数
    var user = req.body;
    try {
        var result = await userService.updatePassword({
            id: id,
            password: user.password,
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
 * @description 更新头像
 * @param {avatar}
 * @url /user/updateAvatar
 * @return {}
 */
router.put("/updateAvatar", async function (req, res, next) {
    // 从cookie中获取当前登录用户的id
    const id = req.signedCookies.id;
    // 获取传递的图片，格式为form-data
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        if (err) {
            res.json({
                code: "1",
                msg: err,
            });
        }
        // 将图片上传到oss
        const img = await putStream(files.avatar);
        // 如果没有上传文件，url则为空，否则为文件的oss地址
        const url = img ? img.url : null;

        try {
            const result = await userService.updateAvatar({
                id: id,
                avatar: url,
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
    try {
        const result = await userService.findOneByName(user);
        res.send(result);
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
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

/**
 * @description 查找当前登录用户的信息
 * @param {}
 * @url /user/findCurrentUser
 * @return {user}
 */
router.get("/findCurrentUser", async function (req, res, next) {
    const id = req.signedCookies.id;
    try {
        const result = await userService.findOneById({ id: id });
        res.send(result);
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

/**
 * @description 用户登出
 * @param {}
 * @url /user/logout
 * @return {}
 */
router.post("/logout", async function (req, res, next) {
    // 销毁会话cookie
    res.clearCookie("id");
    res.clearCookie("name");
    res.clearCookie("password");
    res.send({
        code: "0",
        msg: "success",
    });
});

export default router;
