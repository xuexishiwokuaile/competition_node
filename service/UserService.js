***REMOVED***
***REMOVED***
 * @Date: 2021-03-25 00:01:05
***REMOVED***

import UserDao from "../dao/userDao.js";
import AddError from "../error/AddError.js";
import DeleteError from "../error/DeleteError.js";
import UpdateError from "../error/UpdateError.js";
import UserError from "../error/UserError.js";
import md5 from "md5-node";
import { hasEmpty, isPhoneNum ***REMOVED*** from "../util/stringFormatUtil.js";

class UserService {
    constructor() {
        this.userDao = new UserDao();
***REMOVED***
    async add(params) {
        // 确定用户名称是否重复
        var result = await this.userDao.findOneByName(params);
        // 检验参数是否合规
        if (!Object.keys(params).length) {
            // 判断参数是否为空
            throw new AddError("操作失败，未提供用户");
***REMOVED*** else if (result.length) {
            // 异步异常
            throw new AddError("操作失败，用户名称重复");
***REMOVED*** else if (hasEmpty(params.name) || hasEmpty(params.password)) {
            throw new AddError("操作失败，用户信息含空");
***REMOVED*** else if (!isPhoneNum(params.phone)) {
            throw new AddError("操作失败，手机号格式不正确");
***REMOVED***

    ***REMOVED***
            // 等待promise的错误抛出后再执行
            return await this.userDao.add(params);
***REMOVED*** catch (e) {
            throw new AddError(e);
***REMOVED***
***REMOVED***

    async delete(params) {
        // 检查id是否存在
        var result = await this.userDao.findOneById(params);
        if (!result.length) {
            throw new DeleteError("操作失败，未找到用户");
***REMOVED***
    ***REMOVED***
            return await this.userDao.delete(params);
***REMOVED*** catch (e) {
            throw new DeleteError(e);
***REMOVED***
***REMOVED***

    async updatePassword(params) {
        // 检查id是否存在
        var result = await this.userDao.findOneById(params);
        // 检验参数是否合规
        if (!Object.keys(params).length) {
            // 判断参数是否为空
            throw new UpdateError("操作失败，未提供用户");
***REMOVED*** else if (!result.length) {
            throw new UpdateError("操作失败，未找到用户");
***REMOVED*** else if (hasEmpty(params.password)) {
            throw new UpdateError("操作失败，密码含空");
***REMOVED***

    ***REMOVED***
            return await this.userDao.updatePassword(params);
***REMOVED*** catch (e) {
            throw new UpdateError(e);
***REMOVED***
***REMOVED***

    async findOneById(params) {
        // return一个promise，获取结果需要通过then
        return await this.userDao.findOneById(params);
***REMOVED***

    async findOneByName(params) {
        return await this.userDao.findOneByName(params);
***REMOVED***

    async findAll(params) {
        return await this.userDao.findAll(params);
***REMOVED***

    ***REMOVED****
     * @description 登录
     * @param {name, password***REMOVED***
     * @return {successInfo***REMOVED***
     * @throws {UserError***REMOVED***
    ***REMOVED***
    async login(params) {
        // 检查name是否存在
        var result = await this.userDao.findOneByName(params);
        if (result.length) {
            // 检查密码是否正确
            var password = result[0].password;
            if (password === md5(params.password)) {
                // 密码正确
                return "登录成功";
    ***REMOVED*** else {
                // 密码错误
                throw new UserError("密码错误，请重新输入");
    ***REMOVED***
***REMOVED***
        throw new UserError("登录失败，用户不存在");
***REMOVED***

    async findRoles(params) {
        return await this.userDao.findRoles(params);
***REMOVED***
***REMOVED***

export default UserService;
