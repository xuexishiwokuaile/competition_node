/*
 * @Author: chenanran
 * @Date: 2021-03-26 20:41:43
 */

/**
 * @description 检查url，去掉？后的参数
 * @param {url}
 * @return {url}
 */
export function checkUrl(reqUrl) {
    // 去掉url ?后的参数
    const url =
        reqUrl.indexOf("?") > -1
            ? reqUrl.substring(0, reqUrl.indexOf("?"))
            : reqUrl;

    return url;
}

/**
 * @description 使用正则方式获取url中请求的router名
 * @param {url}
 * @return {routerName}
 */
export function getRouterName(url) {
    // 正则匹配url
    var pattern = /[a-z]+/;
    // 得到用户请求的router名
    var routerName = url.match(pattern)[0];
    return routerName;
}

/**
 * @description 判断是否为图片链接
 * @param {url}
 * @return {boolean}
 */
export function checkImage(url) {
    return /.(png|jpg|jpeg|gif)$/g.test(url);
}
