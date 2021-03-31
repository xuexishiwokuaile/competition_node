***REMOVED***
***REMOVED***
 * @Date: 2021-03-30 11:40:15
***REMOVED***

import { Router ***REMOVED*** from "express";
import MessageService from "../service/MessageService.js";

const router = Router();
const messageService = new MessageService();

***REMOVED****
 * @description 发布消息
 * @param {comId, detail***REMOVED***
 * @url /message/add
 * @return {***REMOVED***
***REMOVED***
router.post("/add", async function (req, res, next) {
    // 从cookie中获取当前登录教师的id
    const teaId = req.signedCookies.id;
    // 读取请求参数
    const message = req.body;
***REMOVED***
        const result = await messageService.add({
            comId: message.comId,
            teaId: teaId,
            detail: message.detail,
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
 * @description 删除消息
 * @param {id***REMOVED*** 多个id，使用逗号分隔
 * @url /message/delete
 * @return {***REMOVED***
***REMOVED***
router.delete("/delete", async function (req, res, next) {
    // 读取请求参数
    const id = req.query.id;
    const ids = id.split(",");
***REMOVED***
        const result = await messageService.delete({
            ids: ids,
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
 * @description 更新消息
 * @param {detail, id[]***REMOVED***
 * @url /message/update
 * @return {***REMOVED***
***REMOVED***
router.put("/update", async function (req, res, next) {
    // 读取请求参数
    const message = req.body;
***REMOVED***
        const result = await messageService.update({
            detail: message.detail,
            ids: message.id,
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
 * @description 更新消息的阅读状态
 * @param {isRead, id***REMOVED*** isRead: true/false
 * @url /message/updateRead
 * @return {***REMOVED***
***REMOVED***
router.put("/updateRead", async function (req, res, next) {
    // 读取请求参数
    const message = req.body;
***REMOVED***
        const result = await messageService.updateRead(message);
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
 * @description 查找某一教师发布的关于某一竞赛的信息
 * @param {comId***REMOVED***
 * @url /message/findOneByComAndTea
 * @return {***REMOVED***
***REMOVED***
router.get("/findOneByComAndTea", async function (req, res, next) {
    // 从cookie中获取当前登录教师的id
    const teaId = req.signedCookies.id;
    // 读取请求参数
    const message = req.query;
***REMOVED***
        const result = await messageService.findOneByComAndTea({
            comId: message.comId,
            teaId: teaId,
        ***REMOVED***
        res.send(result);
***REMOVED***
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        ***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED****
 * @description 查找某一学生的所有消息
 * @param {***REMOVED***
 * @url /message/findOneByStu
 * @return {***REMOVED***
***REMOVED***
router.get("/findOneByStu", async function (req, res, next) {
    // 从cookie中获取当前登录学生的id
    const stuId = req.signedCookies.id;
***REMOVED***
        const result = await messageService.findOneByStu({ stuId: stuId ***REMOVED***
        res.send(result);
***REMOVED***
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        ***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED****
 * @description 查找某一名学生的已读消息
 * @param {***REMOVED***
 * @url /message/findReadByStu
 * @return {Promise***REMOVED***
***REMOVED***
router.get("/findReadByStu", async function (req, res, next) {
    // 从cookie中获取当前登录学生的id
    const stuId = req.signedCookies.id;
***REMOVED***
        const result = await messageService.findReadByStu({ stuId: stuId ***REMOVED***
        res.send(result);
***REMOVED***
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        ***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED****
 * @description 查找某一名学生的未读消息
 * @param {***REMOVED***
 * @url /message/findUnreadByStu
 * @return {Promise***REMOVED***
***REMOVED***
router.get("/findUnreadByStu", async function (req, res, next) {
    // 从cookie中获取当前登录学生的id
    const stuId = req.signedCookies.id;
***REMOVED***
        const result = await messageService.findUnreadByStu({ stuId: stuId ***REMOVED***
        res.send(result);
***REMOVED***
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        ***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED****
 * @description 查找学生所选一门竞赛的消息
 * @param {comId***REMOVED***
 * @url /message/findOneByComAndStu
 * @return {***REMOVED***
***REMOVED***
router.get("/findOneByComAndStu", async function (req, res, next) {
    // 从cookie中获取当前登录学生的id
    const stuId = req.signedCookies.id;
    // 读取请求参数
    const message = req.query;
***REMOVED***
        const result = await messageService.findOneByComAndStu({
            comId: message.comId,
            stuId: stuId,
        ***REMOVED***
        res.send(result);
***REMOVED***
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        ***REMOVED***
***REMOVED***
***REMOVED***

export default router;
