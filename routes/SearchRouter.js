***REMOVED***
***REMOVED***
 * @Date: 2021-03-31 16:04:13
***REMOVED***

import { Router ***REMOVED*** from "express";
import SearchService from "../service/SearchService.js";

const router = Router();
const searchService = new SearchService();

***REMOVED****
 * @description: 根据名称和详情搜索竞赛
 * @param {value***REMOVED***
 * @url /search/searchCom
 * @return {***REMOVED***
***REMOVED***
router.get("/searchCom", async function (req, res, next) {
    // 读取请求参数
    const search = req.query;
***REMOVED***
        const result = await searchService.searchCom(search);
        res.send(result);
***REMOVED***
        res.json({
            code: "1",
            msg: e.name + ": " + e.message,
        ***REMOVED***
***REMOVED***
***REMOVED***

export default router;
