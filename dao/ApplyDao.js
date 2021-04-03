/*
 * @Author: chenanran
 * @Date: 2021-04-01 15:43:00
 */

import mysql from "mysql";
import $conf from "../conf/db.js";
import $util from "../util/pool.js";
import $sql from "./sql/ApplySqlMapping.js";

// 使用连接池，提升性能
const pool = mysql.createPool($util.extend({}, $conf.mysql));

class ApplyDao {
    constructor() {}

    /**
     * @description 组队
     * @param {comId, captain, member, memPositionId, reason}
     * @return {Promise}
     */
    add(apply) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.add,
                    [
                        +apply.comId,
                        +apply.teamId,
                        +apply.captain,
                        +apply.member,
                        +apply.memPositionId,
                        apply.reason,
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
     * @description 取消组队申请或退出小队
     * @param {teamId, stuId}
     * @return {Promise}
     */
    delete(apply) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.delete,
                    // 将id转换为整形
                    [+apply.teamId, +apply.stuId, +apply.stuId],
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
     * @description 同意组队申请
     * @param {captain, member, teamId}
     * @return {Promise}
     */
    updateStatusConfirm(apply) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.updateStatusConfirm,
                    [+apply.captain, +apply.member, +apply.teamId],
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
                            reject("更改失败，信息不存在");
                            return;
                        }
                        // 释放连接
                        resolve("更改成功");
                        connection.release();
                    }
                );
            });
        });
    }

    /**
     * @description 拒绝组队申请
     * @param {captain, member, teamId}
     * @return {Promise}
     */
    updateStatusRefuse(apply) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.updateStatusRefuse,
                    [+apply.captain, +apply.member, +apply.teamId],
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
     * @description 查看某一团队的队员具体信息
     * @param {teamId}
     * @return {Promise}
     */
    findMemberByTeam(apply) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.findMemberByTeam,
                    [+apply.teamId],
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
     * @description 查看某一团队的队长具体信息
     * @param {teamId}
     * @return {Promise}
     */
    findCaptainByTeam(apply) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.findCaptainByTeam,
                    [+apply.teamId],
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
     * @description 队长查看所有竞赛组队的情况
     * @param {captain}
     * @return {Promise}
     */
    findOneByCaptain(apply) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.findOneByCaptain,
                    [+apply.captain],
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
     * @description 队员查看所有竞赛组队的情况
     * @param {member}
     * @return {Promise}
     */
    findOneByMember(apply) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.findOneByMember,
                    [+apply.member],
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
     * @description 判断队长或队员是否重复组队
     * @param {teamId, stuId}
     * @return {Promise}
     */
    findOneByTeamAndStu(apply) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.findOneByTeamAndStu,
                    [+apply.teamId, +apply.stuId, +apply.stuId],
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
     * @description 根据岗位名查找id
     * @param {positionName}
     * @return {Promise}
     */
    findPositionByName(apply) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.findPositionByName,
                    [apply.positionName],
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
     * @description 查找所有岗位的种类
     * @param {}
     * @return {Promise}
     */
    findAllPosition() {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query($sql.findAllPosition, function (err, result) {
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
     * @description 队员查看自己提交的申请
     * @param {member}
     * @return {Promise}
     */
    findApply(apply) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.findApply,
                    [+apply.member],
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
     * @description 队长查看自己收到的申请
     * @param {captain}
     * @return {Promise}
     */
    findReceive(apply) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.findReceive,
                    [+apply.captain],
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

export default ApplyDao;
