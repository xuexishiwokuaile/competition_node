***REMOVED***
***REMOVED***
 * @Date: 2021-03-23 09:51:15
***REMOVED***

import { Router ***REMOVED*** from "express";
import UserService from "../service/UserService.js";
var router = Router();
var userService = new UserService();

***REMOVED*** GET home page.***REMOVED***
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" ***REMOVED***
***REMOVED***

***REMOVED****
 * @description 登录
 * @param {name, password***REMOVED***
 * @url /login
 * @return {***REMOVED***
***REMOVED***
router.post("/login", async function (req, res, next) {
    // 获取传递的参数
    var user = req.body;
***REMOVED***
        var result = await userService.login(user);
        var role = await userService.findRoles(user);
        // 将用户的角色信息传入到session中
        req.session.role = role[0].roleName;
        // 将用户的登录信息传入到cookie中
        res.cookie("name", user.name, {
            httpOnly: true,
            maxAge: 3600 * 24 * 7 * 1000, // 过期时间为一周
            signed: true,
        ***REMOVED***
        res.cookie("password", user.password, {
            httpOnly: true,
            maxAge: 3600 * 24 * 7 * 1000,
            signed: true,
        ***REMOVED***
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
 * @description 注册
 * @param {name, password, phone, gender***REMOVED***
 * @url /register
 * @return {***REMOVED***
***REMOVED***
router.post("/register", async function (req, res, next) {
    // 获取传递的参数
    var user = req.body;
***REMOVED***
        var result = await userService.add(user);
        res.json({
            code: "0",
            msg: "注册成功",
            id: result,
        ***REMOVED***
***REMOVED***
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        ***REMOVED***
***REMOVED***
***REMOVED***

export default router;
