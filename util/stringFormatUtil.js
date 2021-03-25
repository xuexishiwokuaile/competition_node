/*
 * @Author: chenanran
 * @Date: 2021-03-23 15:24:03
 */

export function hasEmpty(input) {
    if (input == null || input.length == 0) return true;
    for (let i = 0; i < input.length; i++) {
        const c = input.charAt(i);
        if (c == " " || c == "\t" || c == "\r" || c == "\n") {
            return true;
        }
    }
    return false;
}

export function isPhoneNum(phoneNum) {
    if (hasEmpty(phoneNum)) return false;
    return /^1[3456789]\d{9}$/.test(phoneNum);
}
