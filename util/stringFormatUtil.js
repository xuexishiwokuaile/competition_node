export default {
    // 判断给定字符串 是否为空或者包含空格
    hasEmpty: function(input) {
        if (input == null || input.length() == 0)
            return true;
        for (let i = 0; i < input.length(); i++) {
            const c = input.charAt(i);
            if (c == ' ' || c == '\t' || c == '\r' || c == '\n') {
                return true;
            }
        }
        return false;
    },
    // 判断给定的字符串是否是一个合法的11位手机号码
    isPhoneNum: function(phoneNum) {
        if (hasEmpty(phoneNum)) return false;
        return (/^1[3456789]\d{9}$/.test(phoneNum));
    }
}