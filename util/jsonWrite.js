// 向前台返回JSON方法的简单封装
export function jsonWrite (res, ret) {
    // if (typeof ret === "undefined") {
    //     res.json({
    //         code: "1",
    //         msg: "操作失败，数据库错误",
    //     ***REMOVED***
    // ***REMOVED*** else {
    //     res.json(ret);
    // ***REMOVED***
    res.json(ret);
***REMOVED***;