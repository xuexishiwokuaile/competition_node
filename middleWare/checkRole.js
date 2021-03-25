***REMOVED***
***REMOVED***
 * @Date: 2021-03-25 17:34:55
***REMOVED***
import UserService from "../service/UserService.js";
import createError from "http-errors";
import authorization from "../conf/authorization.js";

var userService = new UserService();

***REMOVED****
 * @description: 检验用户身份
 * @param {name***REMOVED***
 * @return {***REMOVED***
***REMOVED***
export async function checkRole(req, res, next) {
    if (!(req.signedCookies.name || req.signedCookies.password)) {
        // cookie中不包含name或password字段，返回403错误
        next(createError(403));
***REMOVED***
    var role;
    // 查看session是否存在
    if (!req.session.role) {
        // session中不含role，说明session已过期，查看数据库中存储的用户角色
        // 从cookie中读取name
        var name = req.signedCookies.name;
        var result = await userService.findRoles({ name: name ***REMOVED***
        role = result[0].roleName;
        // 更新session
        req.session.role = role;
***REMOVED*** else {
        role = req.session.role;
***REMOVED***
    // 采用正则匹配url请求
    var pattern = /[a-z]+/;
    // 得到用户请求的接口名，查看是否有权限访问
    var interfaceName = req.url.match(pattern)[0];
    if (
        !(
            authorization[role].hasOwnProperty(interfaceName) &&
            authorization[role][interfaceName]
        )
    ) {
        // 用户角色没有操作权限
        next(createError(403));
***REMOVED***
    next();
***REMOVED***
