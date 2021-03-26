/*
 * @Author: chenanran
 * @Date: 2021-03-25 18:06:05
 */


/**
 * @description 每次用户发送请求后更新cookie，修改cookie过期时间
 */
export function updateCookie(req, res, next) {
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
