***REMOVED***
***REMOVED***
 * @Date: 2021-03-29 13:37:43
***REMOVED***

***REMOVED****
 * @description 取多个数组的交集
 * @param {arrays[]***REMOVED***
 * @return {Array***REMOVED*** 无交集则返回空数组
***REMOVED***
export function intersection(arrays) {
    if (arrays.length === 0) {
        return [];
***REMOVED***
    if (arrays.length === 1) {
        return arrays[0];
***REMOVED***
    return arrays.reduce((prev, next) => {
        return prev.filter((i) => {
            let flag = false;
            for (const item of next) {
                if (i.comId === item.comId) {
                    flag = true;
        ***REMOVED***
    ***REMOVED***
            return flag;
        ***REMOVED***
    ***REMOVED***
***REMOVED***
