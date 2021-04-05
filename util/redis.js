/*
 * @Author: chenanran
 * @Date: 2021-04-05 13:02:58
 */

import redis from "redis";

const REDIS_PORT = process.env.REDIS_PORT || 6379;
// 创建本地redis客户端
const redisClient = redis.createClient(REDIS_PORT);

export default redisClient;
