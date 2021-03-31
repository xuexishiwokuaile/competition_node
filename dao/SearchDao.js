/*
 * @Author: chenanran
 * @Date: 2021-03-31 16:13:12
 */

import mysql from "mysql";
import $conf from "../conf/db.js";
import $util from "../util/pool.js";
import $sql from "./sql/SearchSqlMapping.js";

// 使用连接池，提升性能
const pool = mysql.createPool($util.extend({}, $conf.mysql));

class SearchDao {
    constructor() {}

    /**
     * @description: 根据名称和详情搜索竞赛
     * @param {value}
     * @return {Promise}
     */
    searchCom(search) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                // 获取前台页面传过来的参数
                connection.query(
                    $sql.searchCom,
                    [`%${search.value}%`, `%${search.value}%`],
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

export default SearchDao;
