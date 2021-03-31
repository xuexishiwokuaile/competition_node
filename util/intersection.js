/*
 * @Author: chenanran
 * @Date: 2021-03-29 13:37:43
 */

/**
 * @description 取多个数组的交集
 * @param {arrays[]}
 * @return {Array} 无交集则返回空数组
 */
export function intersection(arrays) {
    if (arrays.length === 0) {
        return [];
    }
    if (arrays.length === 1) {
        return arrays[0];
    }
    return arrays.reduce((prev, next) => {
        return prev.filter((i) => {
            let flag = false;
            for (const item of next) {
                if (i.comId === item.comId) {
                    flag = true;
                }
            }
            return flag;
        });
    });
}
