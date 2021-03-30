/*
 * @Author: chenanran
 * @Date: 2021-03-29 17:08:48
 */

import MessageDao from "../dao/MessageDao.js";
import TakepartDao from "../dao/TakepartDao.js";
import CompetitionDao from "../dao/CompetitionDao.js";
import AddError from "../error/AddError.js";
import DeleteError from "../error/DeleteError.js";
import UpdateError from "../error/UpdateError.js";
import { hasEmpty, isEmpty } from "../util/stringFormatUtil.js";

class MessageService {
    constructor() {
        this.messageDao = new MessageDao();
        this.takepartDao = new TakepartDao();
        this.competitionDao = new CompetitionDao();
    }

    /**
     * @description 新增消息
     * @param {comId, teaId, detail}
     * @return {Promise}
     */
    async add(message) {
        // 查找竞赛是否存在
        const competition = await this.competitionDao.findOneById({
            id: message.comId,
        });
        if (!competition.length) {
            throw new AddError("添加失败，该竞赛不存在");
        }
        // 查找该教师是否负责该竞赛
        if (message.teaId != competition[0].teaId) {
            throw new AddError("添加失败，您没有负责该竞赛");
        }
        // 查找该竞赛下的所有学生
        const students = await this.takepartDao.findStuByCom(message);
        if (!students.length) {
            throw new AddError("添加失败，还没有学生选择该竞赛");
        }
        if (isEmpty(message.detail)) {
            throw new AddError("添加失败，详情为空");
        }
        const promises = await students.map(async (student) => {
            try {
                return await this.messageDao.add({
                    comId: message.comId,
                    stuId: student.stuId,
                    teaId: message.teaId,
                    detail: message.detail,
                });
            } catch (e) {
                throw new AddError(e);
            }
        });

        return await Promise.all(promises);
    }

    /**
     * @description 删除消息
     * @param {id[]}
     * @return {Promise}
     */
    async delete(message) {
        // 去除数组中的重复元素
        const newIds = Array.from(new Set(message.ids));
        const promises = newIds.map(async (id) => {
            const result = await this.messageDao.findOneById({ id: id });
            if (!result.length) {
                throw new DeleteError("删除失败，您还没有发布此条信息");
            }

            try {
                return await this.messageDao.delete({ id: id });
            } catch (e) {
                throw new DeleteError(e);
            }
        });

        return Promise.all(promises);
    }

    /**
     * @description 更新消息
     * @param {detail, id[]}
     * @return {Promise}
     */
    async update(message) {
        if (hasEmpty(message.detail)) {
            throw new UpdateError("更新失败，详情为空");
        }
        // 去除数组中的重复元素
        const newId = Array.from(new Set(message.ids));
        const promises = newId.map(async (id) => {
            const result = await this.messageDao.findOneById({ id: id });
            if (!result.length) {
                throw new UpdateError("更新失败，您还没有发布此条信息");
            }

            try {
                return await this.messageDao.update({
                    detail: message.detail,
                    id: id,
                });
            } catch (e) {
                throw new UpdateError(e);
            }
        });

        return Promise.all(promises);
    }

    /**
     * @description 更新消息的阅读状态
     * @param {read, id}
     * @return {Promise}
     */
    async updateRead(message) {
        // 查看该消息是否存在
        const result = await this.messageDao.findOneById(message);
        if (!result.length) {
            throw new UpdateError("更新失败，该条消息不存在");
        }

        try {
            return await this.messageDao.updateRead(message);
        } catch (e) {
            throw new UpdateError(e);
        }
    }

    /**
     * @description 查找某一教师发布的关于某一竞赛的信息
     * @param {comId, teaId}
     * @return {Promise}
     */
    async findOneByComAndTea(message) {
        return await this.messageDao.findOneByComAndTea(message);
    }

    /**
     * @description 查找某一名学生的所有消息
     * @param {stuId}
     * @return {Promise}
     */
    async findOneByStu(message) {
        return await this.messageDao.findOneByStu(message);
    }

    /**
     * @description 查找某一名学生的已读消息
     * @param {stuId}
     * @return {Promise}
     */
    async findReadByStu(message) {
        return await this.messageDao.findReadByStu(message);
    }

    /**
     * @description 查找某一名学生的未读消息
     * @param {stuId}
     * @return {Promise}
     */
    async findUnreadByStu(message) {
        return await this.messageDao.findUnreadByStu(message);
    }

    /**
     * @description 查找学生所选一门竞赛的消息
     * @param {comId, stuId}
     * @return {Promise}
     */
    async findOneByComAndStu(message) {
        return await this.messageDao.findOneByComAndStu(message);
    }
}

export default MessageService;
