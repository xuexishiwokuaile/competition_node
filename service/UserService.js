/*
 * @Author: chenanran
 * @Date: 2021-03-25 00:01:05
 */

import UserDao from "../dao/userDao.js";
import AddError from "../error/AddError.js";
import DeleteError from "../error/DeleteError.js";
import UpdateError from "../error/UpdateError.js";
import { hasEmpty, isPhoneNum } from "../util/stringFormatUtil.js";

class UserService {
    constructor() {
        this.userDao = new UserDao();
    }
    async add(req, res, next) {
        // 获取参数
        var params = req.body;
        // 确定用户名称是否重复
        var result = await this.userDao.findOneByName(req, res, next);
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
            return await this.userDao.add(req, res, next);
        } catch (e) {
            throw new AddError(e);
        }
    }

    async delete(req, res, next) {
        // 检查id是否存在
        var result = await this.userDao.findOneById(req, res, next);
        if (!result.length) {
            throw new DeleteError("操作失败，未找到用户");
        }
        try {
            return await this.userDao.delete(req, res, next);
        } catch (e) {
            throw new DeleteError(e);
        }
    }

    async updatePassword(req, res, next) {
        // 获取参数
        var params = req.body;
        // 检查id是否存在
        var result = await this.userDao.findOneById(req, res, next);
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
            return await this.userDao.updatePassword(req, res, next);
        } catch (e) {
            throw new UpdateError(e);
        }
    }

    async findOneById(req, res, next) {
        // return一个promise，获取结果需要通过then
        return await this.userDao.findOneById(req, res, next);
    }

    async findOneByName(req, res, next) {
        return await this.userDao.findOneByName(req, res, next);
    }

    async findAll(req, res, next) {
        return await this.userDao.findAll(req, res, next);
    }

    async login(req, res, next) {}
}

export default UserService;
