/*
 * @Author: chenanran
 * @Date: 2021-03-31 14:06:38
 */

import CommentDao from "../dao/CommentDao.js";
import CompetitionDao from "../dao/CompetitionDao.js";
import UserDao from "../dao/UserDao.js";
import AddError from "../error/AddError.js";
import DeleteError from "../error/DeleteError.js";
import UpdateError from "../error/UpdateError.js";
import { isEmpty } from "../util/stringFormatUtil.js";

class CommentService {
    constructor() {
        this.commentDao = new CommentDao();
        this.competitionDao = new CompetitionDao();
        this.userDao = new UserDao();
    }

    /**
     * @description 添加评论
     * @param {comId, stuId, detail, date}
     * @return {Promise}
     * @throws {AddError}
     */
    async add(comment) {
        // 检验竞赛是否存在
        const competition = await this.competitionDao.findOneById({
            id: comment.comId,
        });
        if (!competition.length) {
            throw new AddError("添加失败，竞赛不存在");
        }
        // 检验学生是否存在
        const student = await this.userDao.findOneById({ id: comment.stuId });
        if (!student.length) {
            throw new AddError("添加失败，学生不存在");
        }
        // 检验参数是否合规
        if (isEmpty(comment.detail)) {
            throw new AddError("添加失败，内容为空");
        }

        try {
            return await this.commentDao.add(comment);
        } catch (e) {
            throw new AddError(e);
        }
    }

    /**
     * @description 删除评论
     * @param {id}
     * @return {Promise}
     * @throws {DeleteError}
     */
    async delete(comment) {
        try {
            return await this.commentDao.delete(comment);
        } catch (e) {
            throw new DeleteError(e);
        }
    }

    /**
     * @description 更新评论
     * @param {detail, id}
     * @return {Promise}
     * @throws {UpdateError}
     */
    async update(comment) {
        try {
            return await this.commentDao.update(comment);
        } catch (e) {
            throw new UpdateError(e);
        }
    }

    /**
     * @description 根据id查找评论
     * @param {id}
     * @return {Promise}
     */
    async findOneById(comment) {
        return await this.commentDao.findOneById(comment);
    }

    /**
     * @description 查找某一学生发表的评论
     * @param {stuId}
     * @return {Promise}
     */
    async findOneByStu(comment) {
        return await this.commentDao.findOneByStu(comment);
    }

    /**
     * @description 查找某一竞赛下的评论
     * @param {comId}
     * @return {Promise}
     */
    async findOneByCom(comment) {
        return await this.commentDao.findOneByCom(comment);
    }
}

export default CommentService;
