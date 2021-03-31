/*
 * @Author: chenanran
 * @Date: 2021-03-31 16:15:39
 */

import SearchDao from "../dao/SearchDao.js";
import SearchError from "../error/SearchError.js";
import { isEmpty } from "../util/stringFormatUtil.js";

class SearchService {
    constructor() {
        this.searchDao = new SearchDao();
    }

    /**
     * @description: 根据名称和详情搜索竞赛
     * @param {value}
     * @return {Promise}
     */
    async searchCom(search) {
        // 判断搜索条件是否为空
        if (isEmpty(search.value)) {
            throw new SearchError("搜索失败，没有指定搜索条件");
        }

        try {
            return await this.searchDao.searchCom(search);
        } catch (e) {
            throw new SearchError(e);
        }
    }
}

export default SearchService;
