/*
 * @Author: chenanran
 * @Date: 2021-03-29 13:37:43
 */

/**
 * @description 取多个数组的交集，根据comId判断是否为相同元素
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

/**
 * @description 计算数组中所有元素的和
 * @param {array}
 * @return {sum}
 */
export function arraySum(array) {
    if (array.length === 0) return 0;
    let sum = 0;
    array.map((num) => {
        sum += +num; // 这里使用+将num从string转成number
    });
    return sum;
}

/**
 * @description 将前端传入的count json对象转化为字符串以存储到数据库中
 * @param {count, num} // num代表position数
 * @return {string}
 */
export function countObjToStr(count, num) {
    let result = [];
    for (let i = 0; i < num; i++) {
        result.push(0);
    }
    for (let key in count) {
        switch (key) {
            case "前端":
                result[0] = count[key];
                break;
            case "后端":
                result[1] = count[key];
                break;
            case "算法":
                result[2] = count[key];
                break;
            case "产品":
                result[3] = count[key];
                break;
            case "设计":
                result[4] = count[key];
                break;
        }
    }

    return result.toString();
}

/**
 * @description 将从数据库中获取到的count字符串转化为json对象发送给前端
 * @param {count}
 * @return {object}
 */
export function countStrToObj(count) {
    const temp = {};
    const numbers = count.split(",");
    temp["前端"] = numbers[0];
    temp["后端"] = numbers[1];
    temp["算法"] = numbers[2];
    temp["产品"] = numbers[3];
    temp["设计"] = numbers[4];
    return temp;
}
