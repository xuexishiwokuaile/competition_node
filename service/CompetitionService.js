***REMOVED***
***REMOVED***
 * @Date: 2021-03-26 16:45:56
***REMOVED***

import CompetitionDao from "../dao/CompetitionDao.js";
import AddError from "../error/AddError.js";
import DeleteError from "../error/DeleteError.js";
import UpdateError from "../error/UpdateError.js";
import { isEmpty ***REMOVED*** from "../util/stringFormatUtil.js";

class CompetitionService {
    constructor() {
        this.competitionDao = new CompetitionDao();
***REMOVED***

    ***REMOVED****
     * @description 添加竞赛
     * @param {name, url, detail, image, teaId***REMOVED***
     * @return {Promise***REMOVED***
     * @throws {AddError***REMOVED***
    ***REMOVED***
    async add(competition) {
        // 检验参数是否合规
        if (!Object.keys(competition).length) {
            throw new AddError("添加失败，未提供竞赛");
***REMOVED*** else if (isEmpty(competition.name)) {
            throw new AddError("添加失败，竞赛名为空");
***REMOVED*** else if (isEmpty(competition.url)) {
            throw new AddError("添加失败，竞赛链接为空");
***REMOVED*** else if (isEmpty(competition.detail)) {
            throw new AddError("添加失败，竞赛详情为空");
***REMOVED***

    ***REMOVED***
            return await this.competitionDao.add(competition);
***REMOVED*** catch (e) {
    ***REMOVED***
***REMOVED***
***REMOVED***

    ***REMOVED****
     * @description 删除竞赛
     * @param {id***REMOVED***
     * @return {Promise***REMOVED***
     * @throws {DeleteError***REMOVED***
    ***REMOVED***
    async delete(competition) {
    ***REMOVED***
            return await this.competitionDao.delete(competition);
***REMOVED*** catch (e) {
            throw new DeleteError(e);
***REMOVED***
***REMOVED***

    ***REMOVED****
     * @description 更新竞赛
     * @param {id, name, url, detail, image, teaId***REMOVED***
     * @return {Promise***REMOVED***
     * @throws {UpdateError***REMOVED***
    ***REMOVED***
    async update(competition) {
    ***REMOVED***
            return await this.competitionDao.update(competition);
***REMOVED*** catch (e) {
            throw new UpdateError(e);
***REMOVED***
***REMOVED***

    async findOneById(competition) {
        return await this.competitionDao.findOneById(competition);
***REMOVED***

    async findOneByName(competition) {
        return await this.competitionDao.findOneByName(competition);
***REMOVED***

    async findAll() {
        return await this.competitionDao.findAll();
***REMOVED***
***REMOVED***

export default CompetitionService;
