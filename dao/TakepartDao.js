/*
 * @Author: chenanran
 * @Date: 2021-03-27 12:41:33
 */

import mysql from "mysql";
import $conf from "../conf/db.js";
import $util from "../util/pool.js";
import $sql from "./sql/TakepartSqlMapping.js";

// 使用连接池，提升性能
const pool = mysql.createPool($util.extend({}, $conf.mysql));

class Takepart {
    constructor() {}

    /**
     * @description 学生选择竞赛
     * @param {stuId,comId}
     * @return {Promise}
     */
    add(takepart) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.add,
                    [takepart.stuId, takepart.comId],
                    function (err, result) {
                        // 查看错误详情，便于调试
                        if (err) {
                            console.log(err);
                            connection.release();
                            // 通过reject向外抛出错误
                            // 这里嵌套较多，并且为异步操作，需要采取async方式,来让throw按顺序执行，较为繁琐
                            reject(err);
                            // reject不会终止函数，这里需要手动return来终止
                            return;
                        } else if (!result.affectedRows) {
                            connection.release();
                            reject("添加失败，操作无效");
                            return;
                        }
                        // 获取到数据库中生成的id
                        resolve(result.insertId);
                        // 释放连接
                        connection.release();
                    }
                );
            });
        });
    }

    /**
     * @description 学生放弃竞赛
     * @param {stuId,comId}
     * @return {Promise}
     */
    delete(takepart) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.delete,
                    // 将id转换为整形
                    [+takepart.stuId, +takepart.comId],
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            connection.release();
                            reject(err);
                            return;
                        } else if (!result.affectedRows) {
                            connection.release();
                            reject("删除失败，操作无效");
                            return;
                        }
                        // 释放连接
                        resolve("删除成功");
                        connection.release();
                    }
                );
            });
        });
    }

    /**
     * @description 查看学生选择的所有竞赛
     * @param {stuId}
     * @return {Promise}
     */
    findComByStuId(takepart) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.findComByStuId,
                    [+takepart.stuId],
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            resolve(result);
                        }
                        // 释放连接
                        connection.release();
                    }
                );
            });
        });
    }

    /**
     * @description 查看选择某一竞赛的所有学生
     * @param {comId}
     * @return {Promise}
     */
    findStuByCom(takepart) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.findStuByCom,
                    [+takepart.comId],
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            resolve(result);
                        }
                        // 释放连接
                        connection.release();
                    }
                );
            });
        });
    }

    /**
     * @description 查看学生是否重复选择相同竞赛
     * @param {stuId, comId}
     * @return {Promise}
     */
    findOneByStuIdAndComId(takepart) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.findOneByStuIdAndComId,
                    [+takepart.stuId, +takepart.comId],
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            resolve(result);
                        }
                        // 释放连接
                        connection.release();
                    }
                );
            });
        });
    }
}

export default Takepart;
