/*
 * @Author: chenanran
 * @Date: 2021-03-23 14:41:38
 */

import mysql from "mysql";
import $conf from "../conf/db.js";
import $util from "../util/pool.js";
import $sql from "./UserSqlMapping.js";
import md5 from "md5-node";

// 使用连接池，提升性能
const pool = mysql.createPool($util.extend({}, $conf.mysql));

class UserDao {
    constructor() {}
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
                            reject("添加失败，数据库错误");
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

    delete(user) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 将id转换为整形
                connection.query($sql.delete, +user.id, function (err, result) {
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
                    resolve("操作成功");
                    connection.release();
                });
            });
        });
    }

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
                            reject("更新失败，数据库错误");
                            // reject不会终止函数，这里需要手动return来终止
                            return;
                        } else if (!result.affectedRows) {
                            connection.release();
                            reject("更新失败");
                            return;
                        }
                        // 释放连接
                        resolve("更新成功");
                        connection.release();
                    }
                );
            });
        });
    }

    findOneById(user) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.findOneById,
                    [+user.id],
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

    findRoles(user) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.findRoles,
                    user.name,
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
}

export default UserDao;
