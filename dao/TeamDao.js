/*
 * @Author: chenanran
 * @Date: 2021-04-02 19:42:23
 */

import mysql from "mysql";
import $conf from "../conf/db.js";
import $util from "../util/pool.js";
import $sql from "./sql/TeamSqlMapping.js";

// 使用连接池，提升性能
const pool = mysql.createPool($util.extend({}, $conf.mysql));

class TeamDao {
    constructor() {}

    /**
     * @description 发起组队招募
     * @param {captain, capPositionId, comId, name, detail, date, count, missing}
     * @return {Promise}
     */
    add(team) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.add,
                    [
                        +team.captain,
                        +team.capPositionId,
                        +team.comId,
                        team.name,
                        team.detail,
                        team.date,
                        team.count,
                        +team.missing,
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

    /**
     * @description 取消组队招募/解散团队
     * @param {teamId, captain}
     * @return {Promise}
     */
    delete(team) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.delete,
                    // 将id转换为整形
                    [+team.teamId, +team.captain],
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            connection.release();
                            reject(err);
                            return;
                        } else if (!result.affectedRows) {
                            connection.release();
                            reject("退出失败，信息不存在");
                            return;
                        }
                        // 释放连接
                        resolve("退出成功");
                        connection.release();
                    }
                );
            });
        });
    }

    /**
     * @description 更新团队各个岗位所需的成员数和总的缺少人数
     * @param {count, missing, teamId}
     * @return {Promise}
     */
    updateTeamPosCountAndMissing(team) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.updateTeamPosCountAndMissing,
                    [team.count, +team.missing, +team.teamId],
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

    /**
     * @description 根据id查看某一团队的信息
     * @param {teamId}
     * @return {Promise}
     */
    findOneByTeam(team) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.findOneByTeam,
                    [+team.teamId],
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
     * @description 查看所有团队信息
     * @param {}
     * @return {Promise}
     */
    findAll() {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query($sql.findAll, function (err, result) {
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
     * @description 查看还缺人的团队信息
     * @param {}
     * @return {Promise}
     */
    findMissing(team) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query($sql.findMissing, function (err, result) {
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
     * @description 查看已经完成组队（不缺人）的团队信息
     * @param {}
     * @return {Promise}
     */
    findFinished(team) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query($sql.findFinished, function (err, result) {
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

export default TeamDao;
