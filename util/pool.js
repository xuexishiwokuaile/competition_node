/*
 * @Author: chenanran
 * @Date: 2021-03-23 14:50:19
 */

export default {
    extend: function (target, source, flag) {
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                flag
                    ? (target[key] = source[key])
                    : target[key] === void 0 && (target[key] = source[key]);
            }
        }
        return target;
    },
};
