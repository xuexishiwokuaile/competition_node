***REMOVED***
***REMOVED***
 * @Date: 2021-03-27 17:50:56
***REMOVED***

import TypeDao from "../dao/TypeDao.js";
import AddError from "../error/AddError.js";
import UpdateError from "../error/UpdateError.js";
import { intersection ***REMOVED*** from "../util/intersection.js";

class TypeService {
    constructor() {
        this.typeDao = new TypeDao();
***REMOVED***

    ***REMOVED****
     * @description 给添加的竞赛设定种类
     * @param {type[],comId***REMOVED***
     * @return {Promise***REMOVED***
     * @throws {AddError***REMOVED***
    ***REMOVED***
    async add(type) {
        const comId = type.comId;
        // 去除type数组中的重复元素
        const newType = Array.from(new Set(type.type));
        const promises = newType.map(async (type) => {
            // 检查竞赛类型是否存在
            const comType = await this.typeDao.findOneByType({ typeId: type ***REMOVED***
            if (!comType.length) {
                throw new AddError("添加失败，竞赛类型不存在");
    ***REMOVED***

            const params = {
                comId: comId,
                typeId: type,
    ***REMOVED***;
            // 检查是否重复设定竞赛类型
            const result = await this.typeDao.findOneByComAndType(params);
            if (result.length) {
                throw new AddError("添加失败，竞赛类型重复");
    ***REMOVED***
        ***REMOVED***
                return await this.typeDao.add(params);
    ***REMOVED*** catch (e) {
                throw new AddError(e);
    ***REMOVED***
        ***REMOVED***

        // 只能抛出最先开始发生的错误
        return await Promise.all(promises);
***REMOVED***

    ***REMOVED****
     * @description 更新竞赛种类，需要先删除再添加
     * @param {type[], comId***REMOVED***
     * @return {Promise***REMOVED***
     * @throws {UpdateError***REMOVED***
    ***REMOVED***
    async update(type) {
        const comId = type.comId;
        // 检查竞赛是否存在
        const competition = await this.typeDao.findOneByCom({ comId: comId ***REMOVED***
        if (!competition.length) {
            throw new UpdateError("更新失败，竞赛还未设置种类");
***REMOVED***
        // 删除该竞赛的所有旧种类
        await this.typeDao.delete({ comId: comId ***REMOVED***
        // 去除type数组中的重复元素
        const newType = Array.from(new Set(type.type));
        const promises = newType.map(async (type) => {
            const comType = await this.typeDao.findOneByType({ typeId: type ***REMOVED***
            if (!comType.length) {
                throw new UpdateError("更新失败，竞赛类型不存在");
    ***REMOVED***

            const params = {
                comId: comId,
                typeId: type,
    ***REMOVED***;

        ***REMOVED***
                return await this.typeDao.add(params);
    ***REMOVED*** catch (e) {
                throw new UpdateError(e);
    ***REMOVED***
        ***REMOVED***

        return await Promise.all(promises);
***REMOVED***

    ***REMOVED****
     * @description 查找某一竞赛包含的种类
     * @param {comId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    async findTypeByCom(type) {
        return await this.typeDao.findTypeByCom(type);
***REMOVED***

    ***REMOVED****
     * @description 查找某一种类下的所有竞赛，并按时间排序
     * @param {typeId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    async findComByTypeAndDate(type) {
        return await this.typeDao.findComByTypeAndDate(type);
***REMOVED***

    ***REMOVED****
     * @description 查找某一种类下的所有竞赛，并按热度排序
     * @param {typeId***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    async findComByTypeAndHot(type) {
        return await this.typeDao.findComByTypeAndHot(type);
***REMOVED***

    ***REMOVED****
     * @description 查找同属于多个种类的竞赛
     * @param {typeId[]***REMOVED***
     * @return {Promise***REMOVED***
    ***REMOVED***
    async findComByMultiTypes(types) {
        // 数组去重
        const newTypes = Array.from(new Set(types));
        const promises = newTypes.map(async (type) => {
            return await this.typeDao.findComByType({ typeId: type ***REMOVED***
        ***REMOVED***
        // 结果数组
        const resultArr = await Promise.all(promises);
        // 取数组的交集
        return intersection(resultArr);
***REMOVED***
***REMOVED***

export default TypeService;
