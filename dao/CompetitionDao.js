/*
 * @Author: chenanran
 * @Date: 2021-03-26 15:28:23
 */

import mysql from "mysql";
import $conf from "../conf/db.js";
import $util from "../util/pool.js";
import $sql from "./sql/CompetitionSqlMapping.js";

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
                        +competition.teaId,
                        competition.date,
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
                            return;
                        } else if (!result.affectedRows) {
                            connection.release();
                            reject("添加失败，信息不存在");
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

    delete(competition) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.delete,
                    // 将id转换为整形
                    [+competition.id, +competition.teaId],
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            connection.release();
                            reject(err);
                            return;
                        } else if (!result.affectedRows) {
                            connection.release();
                            reject("删除失败，信息不存在");
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
                        +competition.teaId,
                        +competition.id,
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
                            return;
                        } else if (!result.affectedRows) {
                            connection.release();
                            reject("更新失败，信息不存在");
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
     * @description 查找某一个教师创建的所有竞赛，并按时间排序
     * @param {teaId}
     * @return {Promise}
     */
    findOneByTeaIdByDate(competition) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.findOneByTeaIdByDate,
                    [+competition.teaId],
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
     * @description 查找某一个教师创建的所有竞赛，并按热度排序
     * @param {teaId}
     * @return {Promise}
     */
    findOneByTeaIdByHot(competition) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.findOneByTeaIdByHot,
                    [+competition.teaId],
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
     * @description 查找所有竞赛，并按时间排序
     * @param {}
     * @return {Promise}
     */
    findAllByDate() {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query($sql.findAllByDate, function (err, result) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                    // 释放连接
                    connection.release();
                });
            });
        });
    }

    /**
     * @description 查找所有竞赛，并按热度排序
     * @param {}
     * @return {Promise}
     */
    findAllByHot() {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query($sql.findAllByHot, function (err, result) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                    // 释放连接
                    connection.release();
                });
            });
        });
    }

    /**
     * @description 查找竞赛的所有者
     * @param {}
     * @return {Promise}
     */
    findAllOwners() {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query($sql.findAllOwners, function (err, result) {
                    if (err) {
                        console.log(err);
                        reject(err);
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
