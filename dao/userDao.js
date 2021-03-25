/*
 * @Author: chenanran
 * @Date: 2021-03-23 14:41:38
 */

import mysql from "mysql";
import $conf from "../conf/db.js";
import $util from "../util/pool.js";
import $sql from "./userSqlMapping.js";
import md5 from "md5-node";

// 使用连接池，提升性能
const pool = mysql.createPool($util.extend({}, $conf.mysql));

class UserDao {
    constructor() {}
    add(params) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.add,
                    [
                        params.name,
                        md5(params.password),
                        params.phone,
                        params.gender,
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
                            reject("操作失败");
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

    delete(params) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 将id转换为整形
                connection.query(
                    $sql.delete,
                    +params.id,
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            connection.release();
                            reject("操作失败，数据库错误");
                            return;
                        } else if (!result.affectedRows) {
                            connection.release();
                            reject("操作失败");
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

    updatePassword(params) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.updatePassword,
                    [md5(params.password), +params,id],
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
                            reject("操作失败");
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

    findOneById(params) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.findOneById,
                    [params.id],
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

    findOneByName(params) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.findOneByName,
                    [params.name],
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

    findAll(params) {
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

    findRoles(params) {
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

export default UserDao;
