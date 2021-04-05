/*
 * @Author: chenanran
 * @Date: 2021-04-03 15:54:15
 */

import TeamDao from "../dao/TeamDao.js";
import TakepartDao from "../dao/TakepartDao.js";
import ApplyDao from "../dao/ApplyDao.js";
import AddError from "../error/AddError.js";
import DeleteError from "../error/DeleteError.js";
import { hasEmpty, isEmpty } from "../util/stringFormatUtil.js";
import { arraySum, countObjToStr, countStrToObj } from "../util/arrayUtil.js";

class TeamService {
    constructor() {
        this.teamDao = new TeamDao();
        this.takepartDao = new TakepartDao();
        this.applyDao = new ApplyDao();
    }

    /**
     * @description 发起组队招募
     * @param {captain, positionName, comId, name, detail, date, count} // 这里的count为json对象
     * @return {Promise}
     * @throws {AddError}
     */
    async add(team) {
        // 查看发起人是否参与该竞赛
        const takepart = await this.takepartDao.findOneByStuIdAndComId({
            stuId: team.captain,
            comId: team.comId,
        });
        if (!takepart.length) {
            throw new AddError("发起失败，您还没有选择该竞赛");
        }
        // 查看必要信息是否提供
        if (isEmpty(team.name) || isEmpty(team.detail) || isEmpty(team.count)) {
            throw new AddError("发起失败，您有必要信息未提供");
        }
        // 查看团队名称是否重复
        const name = await this.teamDao.findOneByTeamName(team);
        if (name.length) {
            throw new AddError("发起失败，团队名称重复");
        }
        // 将positionName转化为positionId
        const position = await this.applyDao.findPositionByName(team);
        if (!position.length) {
            throw new AddError("发起失败，所选岗位不存在");
        }
        const positionId = position[0].positionId;
        // 得到岗位的种类数
        const allPosition = await this.applyDao.findAllPosition();
        const positionNum = allPosition.length;
        // 将传入的count数组处理为对应各个岗位的字符串
        const count = countObjToStr(team.count, positionNum);
        // 根据各个岗位所需人数得到小队总的缺少人数
        const missing = arraySum(count.split(","));
        try {
            return await this.teamDao.add({
                captain: team.captain,
                capPositionId: positionId,
                comId: team.comId,
                name: team.name,
                detail: team.detail,
                date: team.date,
                count: count,
                missing: missing,
            });
        } catch (e) {
            throw new AddError(e);
        }
    }

    /**
     * @description 查看所有团队信息
     * @param {}
     * @return {Promise}
     */
    async findAll() {
        const result = await this.teamDao.findAll();
        // 将各个岗位缺少人数的count字符串转化为json数组
        result.map((item) => {
            item.count = countStrToObj(item.count);
        });
        return result;
    }

    /**
     * @description 查看还缺人的团队信息
     * @param {}
     * @return {Promise}
     */
    async findMissing() {
        const result = await this.teamDao.findMissing();
        // 将各个岗位缺少人数的count字符串转化为json数组
        result.map((item) => {
            item.count = countStrToObj(item.count);
        });
        return result;
    }

    /**
     * @description 查看已经完成组队（不缺人）的团队信息
     * @param {}
     * @return {Promise}
     */
    async findFinished() {
        const result = await this.teamDao.findFinished();
        // 将各个岗位缺少人数的count字符串转化为json数组
        result.map((item) => {
            item.count = countStrToObj(item.count);
        });
        return result;
    }
}

export default TeamService;
