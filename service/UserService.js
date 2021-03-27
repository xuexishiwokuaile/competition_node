***REMOVED***
***REMOVED***
 * @Date: 2021-03-25 00:01:05
***REMOVED***

import UserDao from "../dao/UserDao.js";
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
    async add(user) {
        // 确定用户名称是否重复
        var result = await this.userDao.findOneByName(user);
        // 检验参数是否合规
        if (!Object.keys(user).length) {
            // 判断参数是否为空
            throw new AddError("添加失败，未提供用户");
***REMOVED*** else if (result.length) {
            // 异步异常
            throw new AddError("添加失败，用户名称重复");
***REMOVED*** else if (hasEmpty(user.name) || hasEmpty(user.password)) {
            throw new AddError("添加失败，用户信息含空");
***REMOVED*** else if (!isPhoneNum(user.phone)) {
            throw new AddError("添加失败，手机号格式不正确");
***REMOVED*** else if (!Number.isInteger(+user.gender)) {
            throw new AddError("添加失败，性别格式不正确");
***REMOVED***

    ***REMOVED***
            // 等待promise的错误抛出后再执行
            return await this.userDao.add(user);
***REMOVED*** catch (e) {
            throw new AddError(e);
***REMOVED***
***REMOVED***

    async delete(user) {
        // 检查id是否存在
        var result = await this.userDao.findOneById(user);
        if (!result.length) {
            throw new DeleteError("删除失败，未找到用户");
***REMOVED***
    ***REMOVED***
            return await this.userDao.delete(user);
***REMOVED*** catch (e) {
            throw new DeleteError(e);
***REMOVED***
***REMOVED***

    async updatePassword(user) {
        // 检查id是否存在
        var result = await this.userDao.findOneById(user);
        // 检验参数是否合规
        if (!Object.keys(user).length) {
            // 判断参数是否为空
            throw new UpdateError("更新失败，未提供用户");
***REMOVED*** else if (!result.length) {
            throw new UpdateError("更新失败，未找到用户");
***REMOVED*** else if (hasEmpty(user.password)) {
            throw new UpdateError("更新失败，密码含空");
***REMOVED***

    ***REMOVED***
            return await this.userDao.updatePassword(user);
***REMOVED*** catch (e) {
            throw new UpdateError(e);
***REMOVED***
***REMOVED***

    async findOneById(user) {
        // return一个promise，获取结果需要通过then
        return await this.userDao.findOneById(user);
***REMOVED***

    async findOneByName(user) {
        return await this.userDao.findOneByName(user);
***REMOVED***

    async findAll() {
        return await this.userDao.findAll();
***REMOVED***

    ***REMOVED****
     * @description 登录
     * @param {name, password***REMOVED***
     * @return {successInfo***REMOVED***
     * @throws {UserError***REMOVED***
    ***REMOVED***
    async login(user) {
        // 检查name是否存在
        var result = await this.userDao.findOneByName(user);
        if (result.length) {
            // 检查密码是否正确
            var password = result[0].password;
            if (password === md5(user.password)) {
                // 密码正确
                return result[0].id;
    ***REMOVED*** else {
                // 密码错误
                throw new UserError("密码错误，请重新输入");
    ***REMOVED***
***REMOVED***
        throw new UserError("登录失败，用户不存在");
***REMOVED***

    async findRoles(user) {
        return await this.userDao.findRoles(user);
***REMOVED***
***REMOVED***

export default UserService;
