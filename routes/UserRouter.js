***REMOVED***
***REMOVED***
 * @Date: 2021-03-25 00:01:05
***REMOVED***

import { Router ***REMOVED*** from "express";
import UserService from "../service/userService.js";

const router = Router();

const userService = new UserService();

// TODO： 验证session
router.use(function (req, res, next) {
    if (req.session) {
        console.log("session", req.session.role);
***REMOVED***
    next();
***REMOVED***
***REMOVED*** GET users listing.***REMOVED***
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
***REMOVED***

***REMOVED****
 * @description 登录
 * @param {name, password***REMOVED***
 * @url /user/login
 * @return {***REMOVED***
***REMOVED***
router.post("/login", function (req, res, next) {
    // 获取传递的参数
    var params = req.body;
    userService.login(params).then(
        (result) => {
            // TODO: 在session里存储用户信息
            // cookie的过期时间设置为一周
            res.cookie("name", params.name, { httpOnly: true, maxAge: 604800 ***REMOVED***
            res.cookie("password", params.password, { httpOnly: true, maxAge: 604800 ***REMOVED***
            res.json({
                code: "0",
                msg: result,
            ***REMOVED***
***REMOVED***,
        (e) => {
            res.json({
                code: "1",
                msg: e.name + ": " + e.message,
            ***REMOVED***
***REMOVED***
    );
***REMOVED***

***REMOVED****
 * @description 添加用户
 * @param {name, password, phone, gender***REMOVED***
 * @url /user/add
 * @return {***REMOVED***
***REMOVED***
router.post("/add", function (req, res, next) {
    // 获取前端传递的参数
    var params = req.body;
    userService.add(params).then(
        (result) => {
            res.json({
                code: "0",
                msg: result,
            ***REMOVED***
***REMOVED***,
        (e) => {
            res.json({
                code: "1",
                msg: e.name + ": " + e.message,
            ***REMOVED***
***REMOVED***
    );
***REMOVED***

***REMOVED****
 * @description 删除用户
 * @param {id***REMOVED***
 * @url /user/delete
 * @return {***REMOVED***
***REMOVED***
router.delete("/delete", async function (req, res, next) {
    var params = req.query;
    userService.delete(params).then(
        (result) => {
            res.json({
                code: "0",
                msg: result,
            ***REMOVED***
***REMOVED***,
        (e) => {
            res.json({
                code: "1",
                msg: e.name + ": " + e.message,
            ***REMOVED***
***REMOVED***
    );
***REMOVED***

***REMOVED****
 * @description 更新用户密码
 * @param {id, password***REMOVED***
 * @url /user/updatePassword
 * @return {***REMOVED***
***REMOVED***
router.put("/updatePassword", async function (req, res, next) {
    var params = req.body;
    userService.updatePassword(params).then(
        (result) => {
            res.json(
                res.json({
                    code: "0",
                    msg: result,
        ***REMOVED***)
            );
***REMOVED***,
        (e) => {
            res.json({
                code: "1",
                msg: e.name + ": " + e.message,
            ***REMOVED***
***REMOVED***
    );
***REMOVED***

***REMOVED****
 * @description 根据id查找用户
 * @param {id***REMOVED***
 * @url /user/findOneById
 * @return {***REMOVED***
***REMOVED***
router.get("/findOneById", function (req, res, next) {
    var params = req.query;
    userService.findOneById(params).then((result) => {
        res.send(result);
    ***REMOVED***
***REMOVED***

***REMOVED****
 * @description 根据name查找用户
 * @param {name***REMOVED***
 * @url /user/findOneByName
 * @return {***REMOVED***
***REMOVED***
router.get("/findOneByName", function (req, res, next) {
    var params = req.query;
    userService.findOneByName(params).then((result) => {
        res.send(result);
    ***REMOVED***
***REMOVED***

***REMOVED****
 * @description 查找所有用户
 * @param {***REMOVED***
 * @url /user/findAll
 * @return {***REMOVED***
***REMOVED***
router.get("/findAll", function (req, res, next) {
    var params = req.query;
    userService.findAll(params).then((result) => {
        res.send(result);
    ***REMOVED***
***REMOVED***

router.post("/test", function (req, res, next) {
    user = req.body;
    res.cookie("signed", true, { httpOnly: true, maxAge: 1000 ***REMOVED***
    req.session.role = "student";
    res.send("success");
***REMOVED***

export default router;
