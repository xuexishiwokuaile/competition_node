***REMOVED***
***REMOVED***
 * @Date: 2021-03-31 14:22:16
***REMOVED***

import { Router ***REMOVED*** from "express";
import CommentService from "../service/CommentService.js";

const router = Router();
const commentService = new CommentService();

***REMOVED****
 * @description 添加评论
 * @param {comId, detail***REMOVED***
 * @url /comment/add
 * @return {***REMOVED***
***REMOVED***
router.post("/add", async function (req, res, next) {
    // 从cookie中读取当前登录学生的id
    const stuId = req.signedCookies.id;
    // 读取请求参数
    const comment = req.body;
    // 获取当前时间
    const date = new Date();
***REMOVED***
        const result = await commentService.add({
            comId: comment.comId,
            stuId: stuId,
            detail: comment.detail,
            date: date,
        ***REMOVED***
        res.json({
            code: "0",
            msg: "添加成功",
            id: result,
        ***REMOVED***
***REMOVED***
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        ***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED****
 * @description 删除评论
 * @param {id***REMOVED***
 * @url /comment/delete
 * @return {***REMOVED***
***REMOVED***
router.delete("/delete", async function (req, res, next) {
    // 读取请求参数
    const comment = req.query;
***REMOVED***
        const result = await commentService.delete(comment);
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
 * @description 更新评论
 * @param {detail, id***REMOVED***
 * @url /comment/update
 * @return {***REMOVED***
***REMOVED***
router.put("/update", async function (req, res, next) {
    // 读取请求参数
    const comment = req.body;
***REMOVED***
        const result = await commentService.update(comment);
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
 * @description 根据id查找评论
 * @param {id***REMOVED***
 * @url /comment/findOneById
 * @return {***REMOVED***
***REMOVED***
router.get("/findOneById", async function (req, res, next) {
    // 读取请求参数
    const comment = req.query;
***REMOVED***
        const result = await commentService.findOneById(comment);
        res.send(result);
***REMOVED***
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        ***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED****
 * @description 查找某一学生发表的评论
 * @param {***REMOVED***
 * @url /comment/findOneByStu
 * @return {***REMOVED***
***REMOVED***
router.get("/findOneByStu", async function (req, res, next) {
    // 从cookie中读取当前登录学生的id
    const stuId = req.signedCookies.id;
***REMOVED***
        const result = await commentService.findOneByStu({ stuId: stuId ***REMOVED***
        res.send(result);
***REMOVED***
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        ***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED****
 * @description 查找某一竞赛下的评论
 * @param {comId***REMOVED***
 * @url /comment/findOneByCom
 * @return {***REMOVED***
***REMOVED***
router.get("/findOneByCom", async function (req, res, next) {
    // 读取请求参数
    const comment = req.query;
***REMOVED***
        const result = await commentService.findOneByCom(comment);
        res.send(result);
***REMOVED***
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        ***REMOVED***
***REMOVED***
***REMOVED***

export default router;
