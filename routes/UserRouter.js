***REMOVED***
***REMOVED***
 * @Date: 2021-03-25 00:01:05
***REMOVED***

import { Router ***REMOVED*** from "express";
import UserService from "../service/userService.js";

const router = Router();

const userService = new UserService();

***REMOVED****
 * @description 添加用户
 * @param {name, password, phone, gender***REMOVED***
 * @url /user/add
 * @return {***REMOVED***
***REMOVED***
router.post("/add", async function (req, res, next) {
    // 获取前端传递的参数
    var params = req.body;
***REMOVED***
        var result = await userService.add(params);
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
 * @description 删除用户
 * @param {id***REMOVED***
 * @url /user/delete
 * @return {***REMOVED***
***REMOVED***
router.delete("/delete", async function (req, res, next) {
    var params = req.query;
    // userService.delete(params).then(
    //     (result) => {
    //         res.json({
    //             code: "0",
    //             msg: result,
    //         ***REMOVED***
    // ***REMOVED***,
    //     (e) => {
    //         res.json({
    //             code: "1",
    //             msg: e.name + ": " + e.message,
    //         ***REMOVED***
    // ***REMOVED***
    // );

***REMOVED***
        var result = await userService.delete(params);
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
 * @description 更新用户密码
 * @param {id, password***REMOVED***
 * @url /user/updatePassword
 * @return {***REMOVED***
***REMOVED***
router.put("/updatePassword", async function (req, res, next) {
    var params = req.body;
***REMOVED***
        var result = await userService.updatePassword(params);
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
 * @description 根据id查找用户
 * @param {id***REMOVED***
 * @url /user/findOneById
 * @return {***REMOVED***
***REMOVED***
router.get("/findOneById", async function (req, res, next) {
    var params = req.query;
    res.send(await userService.findOneById(params));
***REMOVED***

***REMOVED****
 * @description 根据name查找用户
 * @param {name***REMOVED***
 * @url /user/findOneByName
 * @return {***REMOVED***
***REMOVED***
router.get("/findOneByName", async function (req, res, next) {
    var params = req.query;
    res.send(await userService.findOneByName(params));
***REMOVED***

***REMOVED****
 * @description 查找所有用户
 * @param {***REMOVED***
 * @url /user/findAll
 * @return {***REMOVED***
***REMOVED***
router.get("/findAll", async function (req, res, next) {
    var params = req.query;
    res.send(await userService.findAll(params));
***REMOVED***

router.post("/test", function (req, res, next) {
    user = req.body;
    res.cookie("signed", true, { httpOnly: true, maxAge: 1000 ***REMOVED***
    req.session.role = "student";
    res.send("success");
***REMOVED***

export default router;
