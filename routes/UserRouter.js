***REMOVED***
***REMOVED***
 * @Date: 2021-03-25 00:01:05
***REMOVED***

import { Router ***REMOVED*** from "express";
import UserService from "../service/userService.js";

const router = Router();

const userService = new UserService();

***REMOVED****
 * @description 删除用户
 * @param {id***REMOVED***
 * @url /user/delete
 * @return {***REMOVED***
***REMOVED***
router.delete("/delete", async function (req, res, next) {
    // 获取传递的参数
    var user = req.query;
    // userService.delete(user).then(
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
        var result = await userService.delete(user);
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
    // 获取传递的参数
    var user = req.body;
***REMOVED***
        var result = await userService.updatePassword(user);
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
 * @return {user***REMOVED***
***REMOVED***
router.get("/findOneById", async function (req, res, next) {
    // 获取传递的参数
    var user = req.query;
    res.send(await userService.findOneById(user));
***REMOVED***

***REMOVED****
 * @description 根据name查找用户
 * @param {name***REMOVED***
 * @url /user/findOneByName
 * @return {user***REMOVED***
***REMOVED***
router.get("/findOneByName", async function (req, res, next) {
    var user = req.query;
    res.send(await userService.findOneByName(user));
***REMOVED***

***REMOVED****
 * @description 查找所有用户
 * @param {***REMOVED***
 * @url /user/findAll
 * @return {[user]***REMOVED***
***REMOVED***
router.get("/findAll", async function (req, res, next) {
    res.send(await userService.findAll());
***REMOVED***

export default router;
