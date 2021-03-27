***REMOVED***
***REMOVED***
 * @Date: 2021-03-25 18:06:05
***REMOVED***

import authorization from "../conf/authorization.js";
import { checkUrl, getRouterName ***REMOVED*** from "../util/urlUtil.js";

***REMOVED****
 * @description 每次用户发送请求后更新cookie，修改cookie过期时间
***REMOVED***
export function updateCookie(req, res, next) {
    const url = checkUrl(req.url);
    const routerName = getRouterName(url);

    // 放行匿名请求
    if (
        authorization["anonymous"].hasOwnProperty(url) ||
        authorization["anonymous"].hasOwnProperty(`/${routerName***REMOVED******REMOVED***`)
    )
        next();
    else {
        // 更新cookie
        res.cookie("name", req.signedCookies.name, {
            httpOnly: true,
            maxAge: 3600 * 24 * 7 * 1000, // 过期时间为一周
            signed: true,
        ***REMOVED***
        res.cookie("password", req.signedCookies.password, {
            httpOnly: true,
            maxAge: 3600 * 24 * 7 * 1000,
            signed: true,
        ***REMOVED***
        next();
***REMOVED***
***REMOVED***
