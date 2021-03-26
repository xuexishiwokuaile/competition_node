***REMOVED***
***REMOVED***
 * @Date: 2021-03-23 14:41:38
***REMOVED***

import mysql from "mysql";
import $conf from "../conf/db.js";
import $util from "../util/pool.js";
import $sql from "./UserSqlMapping.js";
import md5 from "md5-node";

// 使用连接池，提升性能
const pool = mysql.createPool($util.extend({***REMOVED***, $conf.mysql));

class UserDao {
    constructor() {***REMOVED***
    add(user) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.add,
                    [user.name, md5(user.password), user.phone, user.gender],
                    function (err, result) {
                        // 查看错误详情，便于调试
                        if (err) {
                            console.log(err);
                            connection.release();
                            // 通过reject向外抛出错误
                            // 这里嵌套较多，并且为异步操作，需要采取async方式,来让throw按顺序执行，较为繁琐
                            reject("操作失败，数据库错误");
                            // reject不会终止函数，这里需要手动return来终止
                ***REMOVED***
                ***REMOVED*** else if (!result.affectedRows) {
                            connection.release();
                            reject("操作失败");
                ***REMOVED***
                ***REMOVED***
                        // 释放连接
                        resolve("操作成功");
                        connection.release();
            ***REMOVED***
                );
            ***REMOVED***
        ***REMOVED***
***REMOVED***

    delete(user) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 将id转换为整形
                connection.query($sql.delete, +user.id, function (err, result) {
                    if (err) {
                        console.log(err);
                        connection.release();
                        reject("操作失败，数据库错误");
            ***REMOVED***
            ***REMOVED*** else if (!result.affectedRows) {
                        connection.release();
                        reject("操作失败");
            ***REMOVED***
            ***REMOVED***
                    // 释放连接
                    resolve("操作成功");
                    connection.release();
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
***REMOVED***

    updatePassword(user) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.updatePassword,
                    [md5(user.password), +user.id],
                    function (err, result) {
                        // 查看错误详情，便于调试
                        if (err) {
                            console.log(err);
                            connection.release();
                            // 通过reject向外抛出错误
                            // 这里嵌套较多，并且为异步操作，需要采取async方式,来让throw按顺序执行，较为繁琐
                            reject("操作失败，数据库错误");
                            // reject不会终止函数，这里需要手动return来终止
                ***REMOVED***
                ***REMOVED*** else if (!result.affectedRows) {
                            connection.release();
                            reject("操作失败");
                ***REMOVED***
                ***REMOVED***
                        // 释放连接
                        resolve("操作成功");
                        connection.release();
            ***REMOVED***
                );
            ***REMOVED***
        ***REMOVED***
***REMOVED***

    findOneById(user) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.findOneById,
                    [user.id],
                    function (err, result) {
                        if (err) {
                            console.log(err);
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

    findOneByName(user) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.findOneByName,
                    [user.name],
                    function (err, result) {
                        if (err) {
                            console.log(err);
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

    findAll() {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query($sql.findAll, function (err, result) {
                    if (err) {
                        console.log(err);
            ***REMOVED*** else {
                        resolve(result);
            ***REMOVED***
                    // 释放连接
                    connection.release();
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
***REMOVED***

    findRoles(user) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.findRoles,
                    user.name,
                    function (err, result) {
                        if (err) {
                            console.log(err);
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

export default UserDao;
