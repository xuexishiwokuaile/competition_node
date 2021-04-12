/*
 * @Author: chenanran
 * @Date: 2021-03-26 15:28:56
 */

const competition = {
    add:
        "INSERT INTO competition(name, url, detail, image, teaId, date) VALUES (?,?,?,?,?,?)",
    delete: "DELETE FROM competition WHERE id = ? AND teaId = ?",
    update:
        "UPDATE competition SET name = ?, url = ?, detail = ?, image = ? WHERE teaId = ? AND id = ?",
    findOneById: "SELECT * FROM competition WHERE id = ?",
    findOneByName: "SELECT * FROM competition WHERE name = ?",
    findOneByTeaIdByDate:
        "SELECT competition.id as comId, competition.name as name, competition.url, competition.detail, competition.image, competition.date, competition.hot, user.id as userId, user.name as userName, user.avatar FROM competition, user WHERE teaId = ? AND user.id = teaId ORDER BY date DESC",
    findOneByTeaIdByHot:
        "SELECT competition.id as comId, competition.name as name, competition.url, competition.detail, competition.image, competition.date, competition.hot, user.id as userId, user.name as userName, user.avatar FROM competition, user WHERE teaId = ? AND user.id = teaId ORDER BY hot DESC",
    findAllByDate:
        "SELECT competition.id as comId, competition.name as name, competition.url, competition.detail, competition.image, competition.date, competition.hot, user.id as userId, user.name as userName, user.avatar FROM competition, user WHERE competition.teaId = user.id ORDER BY date DESC",
    findAllByHot:
        "SELECT competition.id as comId, competition.name as name, competition.url, competition.detail, competition.image, competition.date, competition.hot, user.id as userId, user.name as userName, user.avatar FROM competition, user WHERE competition.teaId = user.id ORDER BY hot DESC",
    findAllOwners:
        "SELECT DISTINCT user.id, user.name FROM competition, user WHERE competition.teaId = user.id",
};

export default competition;
