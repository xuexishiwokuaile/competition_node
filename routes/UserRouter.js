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
 * @description:
***REMOVED***
router.post("/login", function (req, res, next) {***REMOVED***

***REMOVED****
 * @description 添加用户
 * @param {name, password, phone, gender***REMOVED***
 * @url /user/add
 * @return {***REMOVED***
***REMOVED***
router.post("/add", function (req, res, next) {
    userService.add(req, res, next).then(
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
    userService.delete(req, res, next).then(
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
    userService.updatePassword(req, res, next).then(
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
    userService.findOneById(req, res, next).then((result) => {
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
    userService.findOneByName(req, res, next).then((result) => {
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
    userService.findAll(req, res, next).then((result) => {
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
