/*
 * @Author: chenanran
 * @Date: 2021-03-25 20:26:40
 */
export default {
    anonymous: {
        "/login": true,
        "/register": true,
    },
    student: {
        "/login": true,
        "/register": true,
        "/competition": true,
    },
    teacher: {
        user: true,
        login: true,
        competition: true,
    },
    admin: {
        user: true,
        login: true,
        competition: true,
    },
};
