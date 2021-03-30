***REMOVED***
***REMOVED***
 * @Date: 2021-03-29 17:08:48
***REMOVED***

import MessageDao from "../dao/MessageDao.js";
import TakepartDao from "../dao/TakepartDao.js";
import CompetitionDao from "../dao/CompetitionDao.js";
import AddError from "../error/AddError.js";
import DeleteError from "../error/DeleteError.js";
import UpdateError from "../error/UpdateError.js";
import { hasEmpty, isEmpty ***REMOVED*** from "../util/stringFormatUtil.js";

class MessageService {
    constructor() {
        this.messageDao = new MessageDao();
        this.takepartDao = new TakepartDao();
        this.competitionDao = new CompetitionDao();
***REMOVED***

    ***REMOVED****
     * @description 新增消息
     * @param {comId, teaId, detail***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    async add(message) {
        // 查找竞赛是否存在
        const competition = await this.competitionDao.findOneById({
            id: message.comId,
        ***REMOVED***
        if (!competition.length) {
            throw new AddError("添加失败，该竞赛不存在");
***REMOVED***
        // 查找该教师是否负责该竞赛
        if (message.teaId != competition[0].teaId) {
            throw new AddError("添加失败，您没有负责该竞赛");
***REMOVED***
        // 查找该竞赛下的所有学生
        const students = await this.takepartDao.findStuByCom(message);
        if (!students.length) {
            throw new AddError("添加失败，还没有学生选择该竞赛");
***REMOVED***
        if (isEmpty(message.detail)) {
            throw new AddError("添加失败，详情为空");
***REMOVED***
        const promises = await students.map(async (student) => {
        ***REMOVED***
                return await this.messageDao.add({
                    comId: message.comId,
                    stuId: student.stuId,
                    teaId: message.teaId,
                    detail: message.detail,
                ***REMOVED***
    ***REMOVED*** catch (e) {
                throw new AddError(e);
    ***REMOVED***
        ***REMOVED***

        return await Promise.all(promises);
***REMOVED***

    ***REMOVED****
     * @description 删除消息
     * @param {id[]***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    async delete(message) {
        // 去除数组中的重复元素
        const newIds = Array.from(new Set(message.ids));
        const promises = newIds.map(async (id) => {
            const result = await this.messageDao.findOneById({ id: id ***REMOVED***
            if (!result.length) {
                throw new DeleteError("删除失败，您还没有发布此条信息");
    ***REMOVED***

        ***REMOVED***
                return await this.messageDao.delete({ id: id ***REMOVED***
    ***REMOVED*** catch (e) {
                throw new DeleteError(e);
    ***REMOVED***
        ***REMOVED***

        return Promise.all(promises);
***REMOVED***

    ***REMOVED****
     * @description 更新消息
     * @param {detail, id[]***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    async update(message) {
        if (hasEmpty(message.detail)) {
            throw new UpdateError("更新失败，详情为空");
***REMOVED***
        // 去除数组中的重复元素
        const newId = Array.from(new Set(message.ids));
        const promises = newId.map(async (id) => {
            const result = await this.messageDao.findOneById({ id: id ***REMOVED***
            if (!result.length) {
                throw new UpdateError("更新失败，您还没有发布此条信息");
    ***REMOVED***

        ***REMOVED***
                return await this.messageDao.update({
                    detail: message.detail,
                    id: id,
                ***REMOVED***
    ***REMOVED*** catch (e) {
                throw new UpdateError(e);
    ***REMOVED***
        ***REMOVED***

        return Promise.all(promises);
***REMOVED***

    ***REMOVED****
     * @description 更新消息的阅读状态
     * @param {read, id***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    async updateRead(message) {
        // 查看该消息是否存在
        const result = await this.messageDao.findOneById(message);
        if (!result.length) {
            throw new UpdateError("更新失败，该条消息不存在");
***REMOVED***

    ***REMOVED***
            return await this.messageDao.updateRead(message);
***REMOVED*** catch (e) {
            throw new UpdateError(e);
***REMOVED***
***REMOVED***

    ***REMOVED****
     * @description 查找某一教师发布的关于某一竞赛的信息
     * @param {comId, teaId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    async findOneByComAndTea(message) {
        return await this.messageDao.findOneByComAndTea(message);
***REMOVED***

    ***REMOVED****
     * @description 查找某一名学生的所有消息
     * @param {stuId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    async findOneByStu(message) {
        return await this.messageDao.findOneByStu(message);
***REMOVED***

    ***REMOVED****
     * @description 查找某一名学生的已读消息
     * @param {stuId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    async findReadByStu(message) {
        return await this.messageDao.findReadByStu(message);
***REMOVED***

    ***REMOVED****
     * @description 查找某一名学生的未读消息
     * @param {stuId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    async findUnreadByStu(message) {
        return await this.messageDao.findUnreadByStu(message);
***REMOVED***

    ***REMOVED****
     * @description 查找学生所选一门竞赛的消息
     * @param {comId, stuId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    async findOneByComAndStu(message) {
        return await this.messageDao.findOneByComAndStu(message);
***REMOVED***
***REMOVED***

export default MessageService;
