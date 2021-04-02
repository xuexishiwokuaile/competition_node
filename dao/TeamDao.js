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
     * @description 更新团队各个岗位所需的成员数
     * @param {count, teamId}
     * @return {Promise}
     */
    updateTeamPosCount(team) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.updateTeamPosCount,
                    [team.count, +team.teamId],
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
     * @description 查看某一团队的信息
     * @param {teamId}
     * @return {Promise}
     */
    findComByTeam(team) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(
                    $sql.findComByTeam,
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
}

export default TeamDao;
