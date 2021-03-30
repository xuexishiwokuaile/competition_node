***REMOVED***
***REMOVED***
 * @Date: 2021-03-29 16:18:48
***REMOVED***

import mysql from "mysql";
import $conf from "../conf/db.js";
import $util from "../util/pool.js";
import $sql from "./sql/MessageSqlMapping.js";

// 使用连接池，提升性能
const pool = mysql.createPool($util.extend({***REMOVED***, $conf.mysql));

class MessageDao {
    constructor() {***REMOVED***

    ***REMOVED****
     * @description 新增消息
     * @param {comId, stuId, teaId, detail***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    add(message) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.add,
                    [
                        message.comId,
                        message.stuId,
                        message.teaId,
                        message.detail,
                    ],
                    function (err, result) {
                        // 查看错误详情，便于调试
                        if (err) {
                            console.log(err);
                            connection.release();
                            // 通过reject向外抛出错误
                            // 这里嵌套较多，并且为异步操作，需要采取async方式,来让throw按顺序执行，较为繁琐
                            reject(err);
                            // reject不会终止函数，这里需要手动return来终止
                ***REMOVED***
                ***REMOVED*** else if (!result.affectedRows) {
                            connection.release();
                            reject("添加失败，操作无效");
                ***REMOVED***
                ***REMOVED***
                        // 获取到数据库中生成的id
                        resolve(result.insertId);
                        // 释放连接
                        connection.release();
            ***REMOVED***
                );
            ***REMOVED***
        ***REMOVED***
***REMOVED***

    ***REMOVED****
     * @description 删除消息
     * @param {id***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    delete(message) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.delete,
                    // 将id转换为整形
                    [+message.id],
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            connection.release();
                            reject(err);
                ***REMOVED***
                ***REMOVED*** else if (!result.affectedRows) {
                            connection.release();
                            reject("删除失败，操作无效");
                ***REMOVED***
                ***REMOVED***
                        // 释放连接
                        resolve("删除成功");
                        connection.release();
            ***REMOVED***
                );
            ***REMOVED***
        ***REMOVED***
***REMOVED***

    ***REMOVED****
     * @description 更新消息
     * @param {detail, id***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    update(message) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.update,
                    [message.detail, +message.id],
                    function (err, result) {
                        // 查看错误详情，便于调试
                        if (err) {
                            console.log(err);
                            connection.release();
                            // 通过reject向外抛出错误
                            // 这里嵌套较多，并且为异步操作，需要采取async方式,来让throw按顺序执行，较为繁琐
                            reject(err);
                            // reject不会终止函数，这里需要手动return来终止
                ***REMOVED***
                ***REMOVED*** else if (!result.affectedRows) {
                            connection.release();
                            reject("更新失败，操作无效");
                ***REMOVED***
                ***REMOVED***
                        // 释放连接
                        resolve("更新成功");
                        connection.release();
            ***REMOVED***
                );
            ***REMOVED***
        ***REMOVED***
***REMOVED***

    ***REMOVED****
     * @description 更新消息的阅读状态
     * @param {isRead, id***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    updateRead(message) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.updateRead,
                    [+message.isRead, +message.id],
                    function (err, result) {
                        // 查看错误详情，便于调试
                        if (err) {
                            console.log(err);
                            connection.release();
                            // 通过reject向外抛出错误
                            // 这里嵌套较多，并且为异步操作，需要采取async方式,来让throw按顺序执行，较为繁琐
                            reject(err);
                            // reject不会终止函数，这里需要手动return来终止
                ***REMOVED***
                ***REMOVED*** else if (!result.affectedRows) {
                            connection.release();
                            reject("更新失败，操作无效");
                ***REMOVED***
                ***REMOVED***
                        // 释放连接
                        resolve("更新成功");
                        connection.release();
            ***REMOVED***
                );
            ***REMOVED***
        ***REMOVED***
***REMOVED***

    ***REMOVED****
     * @description 查找某一名教师发布的关于某一竞赛的信息
     * @param {comId, teaId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    findOneByComAndTea(message) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.findOneByComAndTea,
                    [+message.comId, +message.teaId],
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            reject(err);
                ***REMOVED*** else {
                            resolve(result);
                ***REMOVED***
                        // 释放连接
                        connection.release();
            ***REMOVED***
                );
            ***REMOVED***
        ***REMOVED***
***REMOVED***

    ***REMOVED****
     * @description 查找某一名学生的所有消息
     * @param {stuId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    findOneByStu(message) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.findOneByStu,
                    [+message.stuId],
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            reject(err);
                ***REMOVED*** else {
                            resolve(result);
                ***REMOVED***
                        // 释放连接
                        connection.release();
            ***REMOVED***
                );
            ***REMOVED***
        ***REMOVED***
***REMOVED***

    ***REMOVED****
     * @description 查找某一名学生的已读消息
     * @param {stuId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    findReadByStu(message) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.findReadByStu,
                    [+message.stuId],
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            reject(err);
                ***REMOVED*** else {
                            resolve(result);
                ***REMOVED***
                        // 释放连接
                        connection.release();
            ***REMOVED***
                );
            ***REMOVED***
        ***REMOVED***
***REMOVED***

    ***REMOVED****
     * @description 查找某一名学生的未读消息
     * @param {stuId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    findUnreadByStu(message) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.findUnreadByStu,
                    [+message.stuId],
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            reject(err);
                ***REMOVED*** else {
                            resolve(result);
                ***REMOVED***
                        // 释放连接
                        connection.release();
            ***REMOVED***
                );
            ***REMOVED***
        ***REMOVED***
***REMOVED***

    ***REMOVED****
     * @description 查找某一名学生所选一门竞赛的消息
     * @param {comId, stuId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    findOneByComAndStu(message) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.findOneByComAndStu,
                    [+message.comId, +message.stuId],
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            reject(err);
                ***REMOVED*** else {
                            resolve(result);
                ***REMOVED***
                        // 释放连接
                        connection.release();
            ***REMOVED***
                );
            ***REMOVED***
        ***REMOVED***
***REMOVED***

    ***REMOVED****
     * @description 根据id查找消息
     * @param {id***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    findOneById(message) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.findOneById,
                    [+message.id],
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            reject(err);
                ***REMOVED*** else {
                            resolve(result);
                ***REMOVED***
                        // 释放连接
                        connection.release();
            ***REMOVED***
                );
            ***REMOVED***
        ***REMOVED***
***REMOVED***
***REMOVED***

export default MessageDao;
