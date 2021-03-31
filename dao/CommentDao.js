***REMOVED***
***REMOVED***
 * @Date: 2021-03-31 13:53:21
***REMOVED***

import mysql from "mysql";
import $conf from "../conf/db.js";
import $util from "../util/pool.js";
import $sql from "./sql/CommentSqlMapping.js";

// 使用连接池，提升性能
const pool = mysql.createPool($util.extend({***REMOVED***, $conf.mysql));

class CommentDao {
    constructor() {***REMOVED***

    ***REMOVED****
     * @description 添加评论
     * @param {comId, stuId, detail, date***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    add(comment) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.add,
                    [
                        +comment.comId,
                        +comment.stuId,
                        comment.detail,
                        comment.date,
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
                            reject("添加失败，信息不存在");
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
     * @description 删除评论
     * @param {id***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    delete(comment) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.delete,
                    // 将id转换为整形
                    +comment.id,
                    function (err, result) {
                        if (err) {
                            // console.log(err);
                            connection.release();
                            reject(err);
                ***REMOVED***
                ***REMOVED*** else if (!result.affectedRows) {
                            connection.release();
                            reject("删除失败，信息不存在");
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
     * @description 更新评论
     * @param {detail, id***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    update(comment) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.update,
                    [comment.detail, +comment.id],
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
                            reject("更新失败，信息不存在");
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
     * @description 根据id查找评论
     * @param {id***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    findOneById(comment) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.findOneById,
                    [+comment.id],
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
     * @description 查找某一学生发表的评论
     * @param {stuId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    findOneByStu(comment) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.findOneByStu,
                    [+comment.stuId],
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
     * @description 查找某一竞赛下的评论
     * @param {comId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    findOneByCom(comment) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.findOneByCom,
                    [+comment.comId],
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

export default CommentDao;
