/*
 * @Author: chenanran
 * @Date: 2021-03-26 15:28:23
 */

import mysql from "mysql";
import $conf from "../conf/db.js";
import $util from "../util/pool.js";
import $sql from "./CompetitionSqlMapping.js";
import md5 from "md5-node";

// 使用连接池，提升性能
const pool = mysql.createPool($util.extend({}, $conf.mysql));

class CompetitionDao {
    constructor() {}
    add(competition) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.add,
                    [
                        competition.name,
                        competition.url,
                        competition.detail,
                        competition.image,
                    ],
                    function (err, result) {
                        // 查看错误详情，便于调试
                        if (err) {
                            console.log(err);
                            connection.release();
                            // 通过reject向外抛出错误
                            // 这里嵌套较多，并且为异步操作，需要采取async方式,来让throw按顺序执行，较为繁琐
                            reject("操作失败，数据库错误");
                            // reject不会终止函数，这里需要手动return来终止
                            return;
                        } else if (!result.affectedRows) {
                            connection.release();
                            reject("添加失败");
                            return;
                        }
                        // 释放连接
                        resolve("添加成功");
                        connection.release();
                    }
                );
            });
        });
    }

    delete(competition) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.delete,
                    // 将id转换为整形
                    +competition.id,
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            connection.release();
                            reject("删除失败，数据库错误");
                            return;
                        } else if (!result.affectedRows) {
                            connection.release();
                            reject("删除失败");
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

    update(competition) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.update,
                    [
                        competition.name,
                        competition.url,
                        competition.detail,
                        competition.image,
                        +competition.id
                    ],
                    function (err, result) {
                        // 查看错误详情，便于调试
                        if (err) {
                            console.log(err);
                            connection.release();
                            // 通过reject向外抛出错误
                            // 这里嵌套较多，并且为异步操作，需要采取async方式,来让throw按顺序执行，较为繁琐
                            reject("删除失败，数据库错误");
                            // reject不会终止函数，这里需要手动return来终止
                            return;
                        } else if (!result.affectedRows) {
                            connection.release();
                            reject("删除失败");
                            return;
                        }
                        // 释放连接
                        resolve("操作成功");
                        connection.release();
                    }
                );
            });
        });
    }

    findOneById(competition) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.findOneById,
                    [+competition.id],
                    function (err, result) {
                        if (err) {
                            console.log(err);
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

    findOneByName(competition) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.findOneByName,
                    [competition.name],
                    function (err, result) {
                        if (err) {
                            console.log(err);
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

    findAll() {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query($sql.findAll, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        resolve(result);
                    }
                    // 释放连接
                    connection.release();
                });
            });
        });
    }
}

export default CompetitionDao;