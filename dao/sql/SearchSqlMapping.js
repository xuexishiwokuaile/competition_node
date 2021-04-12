/*
 * @Author: chenanran
 * @Date: 2021-03-31 16:04:53
 */

const search = {
    searchCom:
        "SELECT competition.id as comId, competition.name as name, competition.url, competition.detail, competition.image, competition.date, competition.hot, user.id as userId, user.name as userName, user.avatar FROM competition, user WHERE (competition.name LIKE ? OR detail LIKE ?) AND competition.teaId = user.id",
};

export default search;
