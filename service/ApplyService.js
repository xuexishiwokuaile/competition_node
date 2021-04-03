/*
 * @Author: chenanran
 * @Date: 2021-04-01 18:22:55
 */

import ApplyDao from "../dao/ApplyDao.js";
import TakepartDao from "../dao/TakepartDao.js";
import TeamDao from "../dao/TeamDao.js";
import AddError from "../error/AddError.js";
import DeleteError from "../error/DeleteError.js";
import UpdateError from "../error/UpdateError.js";
import { hasEmpty, isEmpty } from "../util/stringFormatUtil.js";
import { arraySum } from "../util/arrayUtil.js";

class ApplyService {
    constructor() {
        this.applyDao = new ApplyDao();
        this.takepartDao = new TakepartDao();
        this.teamDao = new TeamDao();
    }

    /**
     * @description 组队
     * @param {teamId, captain, member, memPositionName, reason}
     * @return {Promise}
     * @throws {AddError}
     */
    async add(apply) {
        if (apply.captain === apply.member) {
            throw new AddError("申请失败，您不能加入自己创建的团队");
        } else if (isEmpty(apply.result)) {
            throw new AddError("申请失败，理由为空");
        }
        // 获取团队信息
        const team = await this.teamDao.findOneByTeamId(apply);
        const comId = team[0].comId;
        // 查看用户是否已经参与了该竞赛
        const takepart = await this.takepartDao.findOneByStuIdAndComId({
            stuId: apply.member,
            comId: comId,
        });
        if (!takepart.length) {
            throw new AddError("申请失败，您还没有参与该竞赛");
        }
        const position = await this.applyDao.findPositionByName({
            positionName: apply.memPositionName,
        });
        if (!position.length) {
            throw new AddError("申请失败，所选岗位不存在");
        }
        const result = await this.applyDao.findOneByTeamAndStu({
            teamId: apply.teamId,
            stuId: apply.member,
        });
        if (result.length) {
            throw new AddError("申请失败，您已经申请过了");
        }

        // 根据positionName得到positionId
        const posId = position[0].positionId;

        // 获取团队名额，并转化为数组
        const number = team[0].count;
        const posNumbers = number.split(",");
        // 判断用户申请的岗位是否还存在
        if (+posNumbers[posId - 1]) {
            posNumbers[posId - 1]--;
        } else {
            throw new AddError("申请失败，名额已满");
        }
        // 将最新的名额数更新到数据库
        await this.teamDao.updateTeamPosCountAndMissing({
            count: posNumbers.toString(),
            missing: arraySum(posNumbers),
            teamId: apply.teamId,
        });

        try {
            return await this.applyDao.add({
                comId: comId,
                teamId: apply.teamId,
                captain: apply.captain,
                member: apply.member,
                memPositionId: posId,
                reason: apply.reason,
            });
        } catch (e) {
            throw new AddError(e);
        }
    }

    /**
     * @description 取消组队
     * @param {teamId, stuId}
     * @return {Promise}
     * @throws {DeleteError}
     */
    async delete(apply) {
        // 判断团队是否存在
        const team = await this.teamDao.findOneByTeamId(apply);
        if (!team.length) {
            throw new DeleteError("退出失败，小队不存在");
        }

        try {
            const result = await this.applyDao.delete(apply);
            // 判断请求的用户是队长还是队员
            if (team[0].captain == apply.stuId) {
                // 是队长，再删除team表中的相关信息
                await this.teamDao.delete({
                    teamId: apply.teamId,
                    captain: apply.stuId,
                });
            }
            return result;
        } catch (e) {
            throw new DeleteError(e);
        }
    }

    /**
     * @description 同意组队申请
     * @param {captain, member, teamId}
     * @return {Promise}
     * @throws {UpdateError}
     */
    async updateStatusConfirm(apply) {
        try {
            return await this.applyDao.updateStatusConfirm(apply);
        } catch (e) {
            throw new UpdateError(e);
        }
    }

    /**
     * @description 拒绝组队申请
     * @param {captain, member, teamId}
     * @return {Promise}
     * @throws {UpdateError}
     */
    async updateStatusRefuse(apply) {
        try {
            return await this.applyDao.updateStatusRefuse(apply);
        } catch (e) {
            throw new UpdateError(e);
        }
    }

    /**
     * @description 学生查看自己所有的组队情况
     * @param {stuId}
     * @return {Promise}
     */
    async findTeamByStu(apply) {
        // 首先查看自己是队员的情况
        const member = await this.applyDao.findOneByMember({
            member: apply.stuId,
        });
        // 接下来查看自己是队长的情况
        const captain = await this.applyDao.findOneByCaptain({
            captain: apply.stuId,
        });
        // 将comId和captain存入到set中
        const set = new Set();
        member.map((item) => {
            set.add(item.teamId);
        });
        captain.map((item) => {
            set.add(item.teamId);
        });

        const result = [];
        // 遍历map，进行查询
        for (let item of set) {
            let tempResult = [];
            // 队长信息
            const capResult = await this.applyDao.findCaptainByTeam({
                teamId: item,
            });
            tempResult.push(capResult[0]);
            // 队员信息
            const memResult = await this.applyDao.findMemberByTeam({
                teamId: item,
            });
            memResult.map((item) => {
                tempResult.push(item);
            });
            result.push(tempResult);
        }
        return result;
    }

    /**
     * @description 队员查看自己提交的组队申请
     * @param {member}
     * @return {Promise}
     */
    async findApply(apply) {
        return await this.applyDao.findApply(apply);
    }

    /**
     * @description 队长查看自己收到的组队申请
     * @param {captain}
     * @return {Promise}
     */
    async findReceive(apply) {
        return await this.applyDao.findReceive(apply);
    }
}

export default ApplyService;
