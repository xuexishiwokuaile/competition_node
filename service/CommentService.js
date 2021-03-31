***REMOVED***
***REMOVED***
 * @Date: 2021-03-31 14:06:38
***REMOVED***

import CommentDao from "../dao/CommentDao.js";
import CompetitionDao from "../dao/CompetitionDao.js";
import UserDao from "../dao/UserDao.js";
import AddError from "../error/AddError.js";
import DeleteError from "../error/DeleteError.js";
import UpdateError from "../error/UpdateError.js";
import { isEmpty ***REMOVED*** from "../util/stringFormatUtil.js";

class CommentService {
    constructor() {
        this.commentDao = new CommentDao();
        this.competitionDao = new CompetitionDao();
        this.userDao = new UserDao();
***REMOVED***

    ***REMOVED****
     * @description 添加评论
     * @param {comId, stuId, detail, date***REMOVED***
     * @return {Promise***REMOVED***
     * @throws {AddError***REMOVED***
    ***REMOVED***
    async add(comment) {
        // 检验竞赛是否存在
        const competition = await this.competitionDao.findOneById({
            id: comment.comId,
        ***REMOVED***
        if (!competition.length) {
            throw new AddError("添加失败，竞赛不存在");
***REMOVED***
        // 检验学生是否存在
        const student = await this.userDao.findOneById({ id: comment.stuId ***REMOVED***
        if (!student.length) {
            throw new AddError("添加失败，学生不存在");
***REMOVED***
        // 检验参数是否合规
        if (isEmpty(comment.detail)) {
            throw new AddError("添加失败，内容为空");
***REMOVED***

    ***REMOVED***
            return await this.commentDao.add(comment);
***REMOVED*** catch (e) {
            throw new AddError(e);
***REMOVED***
***REMOVED***

    ***REMOVED****
     * @description 删除评论
     * @param {id***REMOVED***
     * @return {Promise***REMOVED***
     * @throws {DeleteError***REMOVED***
    ***REMOVED***
    async delete(comment) {
    ***REMOVED***
            return await this.commentDao.delete(comment);
***REMOVED*** catch (e) {
            throw new DeleteError(e);
***REMOVED***
***REMOVED***

    ***REMOVED****
     * @description 更新评论
     * @param {detail, id***REMOVED***
     * @return {Promise***REMOVED***
     * @throws {UpdateError***REMOVED***
    ***REMOVED***
    async update(comment) {
    ***REMOVED***
            return await this.commentDao.update(comment);
***REMOVED*** catch (e) {
            throw new UpdateError(e);
***REMOVED***
***REMOVED***

    ***REMOVED****
     * @description 根据id查找评论
     * @param {id***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    async findOneById(comment) {
        return await this.commentDao.findOneById(comment);
***REMOVED***

    ***REMOVED****
     * @description 查找某一学生发表的评论
     * @param {stuId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    async findOneByStu(comment) {
        return await this.commentDao.findOneByStu(comment);
***REMOVED***

    ***REMOVED****
     * @description 查找某一竞赛下的评论
     * @param {comId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    async findOneByCom(comment) {
        return await this.commentDao.findOneByCom(comment);
***REMOVED***
***REMOVED***

export default CommentService;
