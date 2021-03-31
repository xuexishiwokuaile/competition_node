***REMOVED***
***REMOVED***
 * @Date: 2021-03-27 17:41:33
***REMOVED***

import mysql from "mysql";
import $conf from "../conf/db.js";
import $util from "../util/pool.js";
import $sql from "./sql/TypeSqlMapping.js";

// 使用连接池，提升性能
const pool = mysql.createPool($util.extend({***REMOVED***, $conf.mysql));

class TypeDao {
    constructor() {***REMOVED***

    ***REMOVED****
     * @description 给添加的竞赛设定种类
     * @param {comId, typeId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    add(type) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.add,
                    [+type.comId, +type.typeId],
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
     * @description 删除竞赛种类
     * @param {comId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    delete(type) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.delete,
                    // 将id转换为整形
                    +type.comId,
                    function (err, result) {
                        if (err) {
                            console.log(err);
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
     * @description 查找某一竞赛包含的种类
     * @param {comId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    findTypeByCom(type) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.findTypeByCom,
                    [+type.comId],
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
     * @description 查找某一种类下的所有竞赛，并按时间排序
     * @param {typeId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    findComByTypeAndDate(type) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.findComByTypeAndDate,
                    [+type.typeId],
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
     * @description 查找某一种类下的所有竞赛，并按热度排序
     * @param {typeId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    findComByTypeAndHot(type) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.findComByTypeAndHot,
                    [+type.typeId],
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
     * @description 根据type值查找
     * @param {typeId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    findOneByType(type) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.findOneByType,
                    [+type.typeId],
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
     * @description 检查是否重复设定竞赛类型
     * @param {comId, typeId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    findOneByComAndType(type) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.findOneByComAndType,
                    [+type.comId, +type.typeId],
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
     * @description 查看该竞赛是否设定种类
     * @param {comId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    findOneByCom(type) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.findOneByCom,
                    [+type.comId],
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

export default TypeDao;
