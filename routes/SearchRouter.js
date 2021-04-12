/*
 * @Author: chenanran
 * @Date: 2021-03-31 16:04:13
 */

import e, { Router } from "express";
import SearchService from "../service/SearchService.js";
import CompetitionService from "../service/CompetitionService.js";

const router = Router();
const searchService = new SearchService();
const competitionService = new CompetitionService();

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
        let result;
        if (!search.value) {
            // 没有指定搜索条件，默认返回所有值
            result = await competitionService.findAll({ order: "date" });
        } else {
            result = await searchService.searchCom(search);
        }
        res.send(result);
    } catch (e) {
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        });
    }
});

export default router;
