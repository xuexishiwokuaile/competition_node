/*
 * @Author: chenanran
 * @Date: 2021-03-25 17:34:55
 */
import UserService from "../service/UserService.js";
import createError from "http-errors";
import authorization from "../conf/authorization.js";
import { checkUrl, getRouterName } from "../util/urlUtil.js";

var userService = new UserService();

/**
 * @description: 检验用户身份
 * @param {name}
 * @return {}
 */
export async function checkRole(req, res, next) {
    const url = checkUrl(req.url);
    const routerName = getRouterName(url);
    // 放行匿名请求
    if (
        authorization["anonymous"].hasOwnProperty(url) ||
        authorization["anonymous"].hasOwnProperty(`/${routerName}/*`)
    ) {
        next();
    } else {
        // 非匿名请求，需要验证用户角色
        if (!(req.signedCookies.name || req.signedCookies.password)) {
            // cookie中不包含name或password字段，返回401错误
            next(createError(401));
        } else {
            var role;
            // 查看session是否存在
            if (!req.session.role) {
                // session中不含role，说明session已过期，查看数据库中存储的用户角色
                // 从cookie中读取name
                var name = req.signedCookies.name;
                var result = await userService.findRoles({ name: name });
                role = result[0].roleName;
                // 更新session
                req.session.role = role;
            } else {
                role = req.session.role;
            }

            if (
                authorization[role].hasOwnProperty(url) ||
                authorization[role].hasOwnProperty(`/${routerName}/*`)
            ) {
                // 精确匹配 || 模糊匹配
                next();
            } else {
                // 用户角色与权限表不匹配
                next(createError(401));
            }
        }
    }
}
