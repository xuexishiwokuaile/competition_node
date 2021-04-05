/*
 * @Author: chenanran
 * @Date: 2021-04-05 12:50:22
 */

import redisClient from "../util/redis.js";
import createError from "http-errors";

/**
 * @description 在请求websocket前使用此中间件，检查token和redis中存储的是否一致
 * @param {id, token}
 * @return {}
 */
export function redisCache(ws, req, next) {
    const { id, token } = req.query;

    redisClient.get(id, (error, cachedData) => {
        if (error) throw error;
        if (cachedData != null) {
            // 比较redis中存储的token是否和客户端传入的token相同
            if (cachedData === token) {
                // 相同代表鉴权成功，放行
                next();
            } else {
                // 不同代表用户未授权，抛出403错误
                ws.send("权限错误，连接失败");
                next(createError(403));
            }
        } else {
            // redis中存储的信息已失效，需要用户重新登录
            ws.send("登录信息已失效，请重新登录");
            next(createError(403));
        }
    });
}
