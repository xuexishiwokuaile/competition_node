/*
 * @Author: chenanran
 * @Date: 2021-03-25 00:01:05
 */

import UserDao from "../dao/userDao.js";
import AddError from "../error/AddError.js";
import DeleteError from "../error/DeleteError.js";
import UpdateError from "../error/UpdateError.js";
import UserError from "../error/UserError.js";
import md5 from "md5-node";
import { hasEmpty, isPhoneNum } from "../util/stringFormatUtil.js";

class UserService {
    constructor() {
        this.userDao = new UserDao();
    }
    async add(params) {
        // 确定用户名称是否重复
        var result = await this.userDao.findOneByName(params);
        // 检验参数是否合规
        if (!Object.keys(params).length) {
            // 判断参数是否为空
            throw new AddError("操作失败，未提供用户");
        } else if (result.length) {
            // 异步异常
            throw new AddError("操作失败，用户名称重复");
        } else if (hasEmpty(params.name) || hasEmpty(params.password)) {
            throw new AddError("操作失败，用户信息含空");
        } else if (!isPhoneNum(params.phone)) {
            throw new AddError("操作失败，手机号格式不正确");
        }

        try {
            // 等待promise的错误抛出后再执行
            return await this.userDao.add(params);
        } catch (e) {
            throw new AddError(e);
        }
    }

    async delete(params) {
        // 检查id是否存在
        var result = await this.userDao.findOneById(params);
        if (!result.length) {
            throw new DeleteError("操作失败，未找到用户");
        }
        try {
            return await this.userDao.delete(params);
        } catch (e) {
            throw new DeleteError(e);
        }
    }

    async updatePassword(params) {
        // 检查id是否存在
        var result = await this.userDao.findOneById(params);
        // 检验参数是否合规
        if (!Object.keys(params).length) {
            // 判断参数是否为空
            throw new UpdateError("操作失败，未提供用户");
        } else if (!result.length) {
            throw new UpdateError("操作失败，未找到用户");
        } else if (hasEmpty(params.password)) {
            throw new UpdateError("操作失败，密码含空");
        }

        try {
            return await this.userDao.updatePassword(params);
        } catch (e) {
            throw new UpdateError(e);
        }
    }

    async findOneById(params) {
        // return一个promise，获取结果需要通过then
        return await this.userDao.findOneById(params);
    }

    async findOneByName(params) {
        return await this.userDao.findOneByName(params);
    }

    async findAll(params) {
        return await this.userDao.findAll(params);
    }

    /**
     * @description 登录
     * @param {name, password}
     * @return {successInfo}
     * @throws {UserError}
     */
    async login(params) {
        // 检查name是否存在
        var result = await this.userDao.findOneByName(params);
        if (result.length) {
            // 检查密码是否正确
            var password = result[0].password;
            if (password === md5(params.password)) {
                // 密码正确
                return "登录成功";
            } else {
                // 密码错误
                throw new UserError("密码错误，请重新输入");
            }
        }
        throw new UserError("登录失败，用户不存在");
    }
}

export default UserService;
