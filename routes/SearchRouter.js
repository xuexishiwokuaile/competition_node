/*
 * @Author: chenanran
 * @Date: 2021-03-31 16:04:13
 */

import { Router } from "express";
import SearchService from "../service/SearchService.js";

const router = Router();
const searchService = new SearchService();

/**
 * @description: 根据名称和详情搜索竞赛
 * @param {value}
 * @url /search/searchCom
 * @return {}
 */
router.get("/searchCom", async function (req, res, next) {
    // 读取请求参数
    const search = req.query;
    try {
        const result = await searchService.searchCom(search);
        res.send(result);
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

export default router;
