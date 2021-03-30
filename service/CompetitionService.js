/*
 * @Author: chenanran
 * @Date: 2021-03-26 16:45:56
 */

import CompetitionDao from "../dao/CompetitionDao.js";
import AddError from "../error/AddError.js";
import DeleteError from "../error/DeleteError.js";
import UpdateError from "../error/UpdateError.js";
import { isEmpty } from "../util/stringFormatUtil.js";

class CompetitionService {
    constructor() {
        this.competitionDao = new CompetitionDao();
    }

    /**
     * @description 添加竞赛
     * @param {name, url, detail, image, teaId}
     * @return {Promise}
     * @throws {AddError}
     */
    async add(competition) {
        // 检验参数是否合规
        if (!Object.keys(competition).length) {
            throw new AddError("添加失败，未提供竞赛");
        } else if (isEmpty(competition.name)) {
            throw new AddError("添加失败，竞赛名为空");
        } else if (isEmpty(competition.url)) {
            throw new AddError("添加失败，竞赛链接为空");
        } else if (isEmpty(competition.detail)) {
            throw new AddError("添加失败，竞赛详情为空");
        }

        try {
            return await this.competitionDao.add(competition);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * @description 删除竞赛
     * @param {id}
     * @return {Promise}
     * @throws {DeleteError}
     */
    async delete(competition) {
        // 检查id是否存在
        const result = await this.competitionDao.findOneById(competition);
        if (!result.length) {
            throw new DeleteError("删除失败，未找到竞赛");
        }

        try {
            return await this.competitionDao.delete(competition);
        } catch (e) {
            throw new DeleteError(e);
        }
    }

    /**
     * @description 更新竞赛
     * @param {id, name, url, detail, image, teaId}
     * @return {Promise}
     * @throws {UpdateError}
     */
    async update(competition) {
        // 检查id是否存在
        const result = await this.competitionDao.findOneById(competition);
        if (!result.length) {
            throw new UpdateError("更新失败，未找到竞赛");
        }

        try {
            return await this.competitionDao.update(competition);
        } catch (e) {
            throw new UpdateError(e);
        }
    }

    async findOneById(competition) {
        return await this.competitionDao.findOneById(competition);
    }

    async findOneByName(competition) {
        return await this.competitionDao.findOneByName(competition);
    }

    async findAll() {
        return await this.competitionDao.findAll();
    }
}

export default CompetitionService;
