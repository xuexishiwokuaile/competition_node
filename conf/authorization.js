/*
 * @Author: chenanran
 * @Date: 2021-03-25 20:26:40
 */
export default {
    anonymous: {
        "/login": "",
        "/register": "",
    },
    student: {
        "/user/updatePassword": "",
        "/user/updateProfile": "",
        "/competition/findOneById": "",
        "/competition/findOneByName": "",
        "/competition/*": "",
        "/takepart/*": "",
        "/type/*": "",
        "/message/*": "",
        "/comment/*": "",
        "/search/*": "",
    },
    teacher: {
        "/user/*": "",
        "/competition/*": "",
    },
    admin: {
        "/user/*": "",
        "/competition/*": "",
    },
};
