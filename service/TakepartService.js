***REMOVED***
***REMOVED***
 * @Date: 2021-03-27 14:25:41
***REMOVED***

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
***REMOVED***

    ***REMOVED****
     * @description 学生选择竞赛
     * @param {stuId, comId***REMOVED***
     * @return {***REMOVED***
     * @throws {AddError***REMOVED***
    ***REMOVED***
    async add(takepart) {
        // 检验用户和竞赛是否存在
        var user = await this.userDao.findOneById({ id: takepart.stuId ***REMOVED***
        var competition = await this.competitionDao.findOneById({
            id: takepart.comId,
        ***REMOVED***

        if (!user.length) {
            throw new AddError("添加失败，学生不存在");
***REMOVED*** else if (!competition.length) {
            throw new AddError("添加失败，竞赛不存在");
***REMOVED***

        // 判断是否重复选择竞赛
        var result = await this.takepartDao.findOneByStuIdAndComId(takepart);
        if (result.length) {
            throw new AddError("添加失败，已经选择过该竞赛了");
***REMOVED***

    ***REMOVED***
            return await this.takepartDao.add(takepart);
***REMOVED*** catch (e) {
            throw new AddError(e);
***REMOVED***
***REMOVED***

    ***REMOVED****
     * @description 学生放弃竞赛
     * @param {stuId,comId***REMOVED***
     * @return {***REMOVED***
     * @throws {DeleteError***REMOVED***
    ***REMOVED***
    async delete(takepart) {
        // 检验用户和竞赛是否存在
        var user = await this.userDao.findOneById({ id: takepart.stuId ***REMOVED***
        var competition = await this.competitionDao.findOneById({
            id: takepart.comId,
        ***REMOVED***

        if (!user.length) {
            throw new DeleteError("删除失败，学生不存在");
***REMOVED*** else if (!competition.length) {
            throw new DeleteError("删除失败，竞赛不存在");
***REMOVED***

    ***REMOVED***
            return await this.takepartDao.delete(takepart);
***REMOVED*** catch (e) {
            throw new DeleteError(e);
***REMOVED***
***REMOVED***

    ***REMOVED****
     * @description 查看学生选择的所有竞赛
     * @param {stuId***REMOVED***
     * @return {***REMOVED***
    ***REMOVED***
    async findComByStuId(takepart) {
        return await this.takepartDao.findComByStuId(takepart);
***REMOVED***

    ***REMOVED****
     * @description 查看选择某一竞赛的所有学生
     * @param {comId***REMOVED***
     * @return {***REMOVED***
    ***REMOVED***
    async findStuByCom(takepart) {
        return await this.takepartDao.findStuByCom(takepart);
***REMOVED***
***REMOVED***

export default TakepartService;
