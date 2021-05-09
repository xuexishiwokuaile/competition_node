/*
 * @Author: chenanran
 * @Date: 2021-03-26 16:45:56
 */

import CompetitionDao from "../dao/CompetitionDao.js";
import TypeDao from "../dao/TypeDao.js";
import AddError from "../error/AddError.js";
import DeleteError from "../error/DeleteError.js";
import UpdateError from "../error/UpdateError.js";
import { isEmpty } from "../util/stringFormatUtil.js";

class CompetitionService {
    constructor() {
        this.competitionDao = new CompetitionDao();
        this.typeDao = new TypeDao();
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
     * @param {id[], teaId} // 批量删除
     * @return {Promise}
     * @throws {DeleteError}
     */
    async delete(competition) {
        // 数组去重
        const newId = Array.from(new Set(competition.id));
        const promises = newId.map(async (id) => {
            try {
                return await this.competitionDao.delete({
                    id: id,
                    teaId: competition.teaId,
                });
            } catch (e) {
                throw new DeleteError(e);
            }
        });

        return await Promise.all(promises);
    }

    /**
     * @description 更新竞赛
     * @param {id, name, url, detail, image, teaId}
     * @return {Promise}
     * @throws {UpdateError}
     */
    async update(competition) {
        try {
            return await this.competitionDao.update(competition);
        } catch (e) {
            throw new UpdateError(e);
        }
    }

    async findOneById(competition) {
        // 竞赛基本信息
        const result = await this.competitionDao.findOneById(competition);
        // 竞赛的种类
        const types = await this.typeDao.findTypeByCom({
            comId: competition.id,
        });
        // 获取种类id
        const typeIdArr = [];
        const typeNameArr = [];
        types.map((type) => {
            typeIdArr.push(type.typeId);
            typeNameArr.push(type.typeName);
        });
        return {
            ...result[0],
            typeId: typeIdArr.toString(),
            typeName: typeNameArr.toString(),
        };
    }

    async findOneByName(competition) {
        return await this.competitionDao.findOneByName(competition);
    }

    /**
     * @description 查找某一个教师创建的所有竞赛
     * @param {teaId, order}
     * @return {Promise}
     */
    async findOneByTeaId(competition) {
        const order = competition.order;
        switch (order) {
            case "date":
                return await this.competitionDao.findOneByTeaIdByDate(
                    competition
                );
            case "hot":
                return await this.competitionDao.findOneByTeaIdByHot(
                    competition
                );
            default:
                return await this.competitionDao.findOneByTeaIdByDate(
                    competition
                );
        }
    }

    /**
     * @description 查找所有竞赛，按指定的方式排序
     * @param {order}
     * @return {Promise}
     */
    async findAll(competition) {
        // 获取排序方式
        const order = competition.order;
        switch (order) {
            case "date":
                return await this.competitionDao.findAllByDate();
            case "hot":
                return await this.competitionDao.findAllByHot();
            default:
                return await this.competitionDao.findAllByDate();
        }
    }

    /**
     * @description 查找竞赛的所有者
     * @param {}
     * @return {Promise}
     */
    async findAllOwners() {
        return await this.competitionDao.findAllOwners();
    }
}

export default CompetitionService;
