/*
 * @Author: chenanran
 * @Date: 2021-03-25 20:26:40
 */
export default {
    anonymous: {
        "/login": "",
        "/register": "",
        "/message/ws/.websocket": "", // websocket连接
    },
    student: {
        "/user/updatePassword": "",
        "/user/updateAvatar": "",
        "/competition/findOneById": "",
        "/competition/findOneByName": "",
        "/competition/*": "",
        "/takepart/*": "",
        "/type/*": "",
        "/message/*": "",
        "/comment/*": "",
        "/search/*": "",
        "/apply/*": "",
        "/team/*": "",
    },
    teacher: {
        "/user/*": "",
        "/competition/*": "",
        "/type/*": "",
    },
    admin: {
        "/user/*": "",
        "/competition/*": "",
    },
};
