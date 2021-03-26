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
    // // 采用正则匹配url请求
    // var pattern = /[a-z]+/;
    // // 得到用户请求的接口名，查看是否有权限访问
    // var interfaceName = req.url.match(pattern)[0];

    // 去掉url ?后的参数
    const url = req.url.substring(0, req.url.indexOf("?"));

    // 放行匿名请求
    if (authorization["anonymous"].hasOwnProperty(url)) {
        next();
***REMOVED*** else {
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

        if (authorization[role].hasOwnProperty(url)) {
            // 精确匹配
            next();
***REMOVED*** else {
            // 模糊匹配*
            // 正则匹配url
            var pattern = /[a-z]+/;
            // 得到用户请求的router名
            var routerName = url.match(pattern)[0];
            if (authorization[role].hasOwnProperty(`/${routerName***REMOVED******REMOVED***`)) {
                // 模糊匹配成功
                next();
    ***REMOVED*** else {
                // 用户角色没有操作权限
                next(createError(403));
    ***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
