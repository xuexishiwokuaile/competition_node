/*
 * @Author: chenanran
 * @Date: 2021-04-05 13:43:47
 */

import md5 from "md5-node";

/**
 * @description 生成token
 * @param {name, password}
 * @return {token}
 */
export function tokenGenerator(name, password) {
    // 获取当前时间戳
    const date = new Date().getTime();
    const temp = name + password + date;
    return md5(temp);
}
