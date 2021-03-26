***REMOVED***
***REMOVED***
 * @Date: 2021-03-23 15:24:03
***REMOVED***

export function hasEmpty(input) {
    if (input == null || input.length == 0) return true;
    for (let i = 0; i < input.length; i++) {
        const c = input.charAt(i);
        if (c == " " || c == "\t" || c == "\r" || c == "\n") {
            return true;
***REMOVED***
***REMOVED***
    return false;
***REMOVED***

export function isEmpty(input) {
    if (input == null || input.length == 0) return true;
    return false;
***REMOVED***

export function isPhoneNum(phoneNum) {
    if (hasEmpty(phoneNum)) return false;
    return /^1[3456789]\d{9***REMOVED***$/.test(phoneNum);
***REMOVED***
