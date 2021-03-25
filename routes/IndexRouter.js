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
    var params = req.body;
    try {
        var result = await userService.login(params);
        var role = await userService.findRoles(params);
        // 将用户的角色信息传入到session中
        req.session.role = role[0].roleName;
        // 将用户的登录信息传入到cookie中
        res.cookie("name", params.name, {
            httpOnly: true,
            maxAge: 3600 * 24 * 7 * 1000, // 过期时间为一周
            signed: true,
        });
        res.cookie("password", params.password, {
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

export default router;
