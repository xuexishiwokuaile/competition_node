/*
 * @Author: chenanran
 * @Date: 2021-03-23 09:51:15
 */

import { Router } from "express";
import UserService from "../service/UserService.js";
var router = Router();
var userService = new UserService();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

/**
 * @description 登录
 * @param {name, password}
 * @url /login
 * @return {}
 */
router.post("/login", async function (req, res, next) {
    // 获取传递的参数
    var user = req.body;
    try {
        var result = await userService.login(user);
        var role = await userService.findRoles(user);
        // 将用户的角色信息传入到session中
        req.session.role = role[0].roleName;
        // 将用户的登录信息传入到cookie中
        res.cookie("name", user.name, {
            httpOnly: true,
            maxAge: 3600 * 24 * 7 * 1000, // 过期时间为一周
            signed: true,
        });
        res.cookie("password", user.password, {
            httpOnly: true,
            maxAge: 3600 * 24 * 7 * 1000,
            signed: true,
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
 * @description 注册
 * @param {name, password, phone, gender}
 * @url /register
 * @return {}
 */
router.post("/register", async function (req, res, next) {
    // 获取传递的参数
    var user = req.body;
    try {
        var result = await userService.add(user);
        res.json({
            code: "0",
            msg: "注册成功",
            id: result,
        });
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

export default router;
