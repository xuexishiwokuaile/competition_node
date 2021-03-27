/*
 * @Author: chenanran
 * @Date: 2021-03-27 14:25:41
 */

import TakepartDao from "../dao/TakepartDao.js";
import UserDao from "../dao/UserDao.js";
import CompetitionDao from "../dao/CompetitionDao.js";
import AddError from "../error/AddError.js";
import DeleteError from "../error/DeleteError.js";

class TakepartService {
    constructor() {
        this.takepartDao = new TakepartDao();
        this.userDao = new UserDao();
        this.competitionDao = new CompetitionDao();
    }

    /**
     * @description 学生选择竞赛
     * @param {stuId, comId}
     * @return {}
     * @throws {AddError}
     */
    async add(takepart) {
        // 检验用户和竞赛是否存在
        var user = await this.userDao.findOneById({ id: takepart.stuId });
        var competition = await this.competitionDao.findOneById({
            id: takepart.comId,
        });

        if (!user.length) {
            throw new AddError("添加失败，学生不存在");
        } else if (!competition.length) {
            throw new AddError("添加失败，竞赛不存在");
        }

        // 判断是否重复选择竞赛
        var result = await this.takepartDao.findOneByStuIdAndComId(takepart);
        if (result.length) {
            throw new AddError("添加失败，已经选择过该竞赛了");
        }

        try {
            return await this.takepartDao.add(takepart);
        } catch (e) {
            throw new AddError(e);
        }
    }

    /**
     * @description 学生放弃竞赛
     * @param {stuId,comId}
     * @return {}
     * @throws {DeleteError}
     */
    async delete(takepart) {
        // 检验用户和竞赛是否存在
        var user = await this.userDao.findOneById({ id: takepart.stuId });
        var competition = await this.competitionDao.findOneById({
            id: takepart.comId,
        });

        if (!user.length) {
            throw new DeleteError("删除失败，学生不存在");
        } else if (!competition.length) {
            throw new DeleteError("删除失败，竞赛不存在");
        }

        try {
            return await this.takepartDao.delete(takepart);
        } catch (e) {
            throw new DeleteError(e);
        }
    }

    /**
     * @description 查看学生选择的所有竞赛
     * @param {stuId}
     * @return {}
     */
    async findComByStuId(takepart) {
        return await this.takepartDao.findComByStuId(takepart);
    }
}

export default TakepartService;
