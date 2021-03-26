/*
 * @Author: chenanran
 * @Date: 2021-03-25 18:06:05
 */

/**
 * @description 每次用户发送请求后更新cookie，修改cookie过期时间
 */
export function updateCookie(req, res, next) {
    // 采用正则匹配url请求
    var pattern = /[a-z]+/;
    // 得到用户请求的接口名，查看是否有权限访问
    var interfaceName = req.url.match(pattern)[0];
    // 放行login
    if (interfaceName === "login") next();
    else {
        // 更新cookie
        res.cookie("name", req.signedCookies.name, {
            httpOnly: true,
            maxAge: 3600 * 24 * 7 * 1000, // 过期时间为一周
            signed: true,
        });
        res.cookie("password", req.signedCookies.password, {
            httpOnly: true,
            maxAge: 3600 * 24 * 7 * 1000,
            signed: true,
        });
        next();
    }
}
