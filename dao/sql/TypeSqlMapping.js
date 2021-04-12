/*
 * @Author: chenanran
 * @Date: 2021-03-27 17:41:26
 */

const type = {
    add: "INSERT INTO competition_type(comId, typeId) VALUES (?,?)",
    delete: "DELETE FROM competition_type WHERE comId = ?",
    findTypeByCom:
        "SELECT * FROM competition_type,type WHERE competition_type.comId = ? AND competition_type.typeId = type.typeId",
    findComByTypeAndDate:
        "SELECT competition.id as comId, competition.name as name, competition.url, competition.detail, competition.image, competition.date, competition.hot, user.id as userId, user.name as userName, user.avatar FROM competition, competition_type, type, user  WHERE type.typeName = ? AND competition_type.typeId = type.typeId AND competition_type.comId = competition.id AND competition.teaId = user.id ORDER BY date DESC",
    findComByTypeAndHot:
        "SELECT competition.id as comId, competition.name as name, competition.url, competition.detail, competition.image, competition.date, competition.hot, user.id as userId, user.name as userName, user.avatar FROM competition, competition_type, type, user WHERE type.typeName = ? AND competition_type.typeId = type.typeId AND competition_type.comId = competition.id AND competition.teaId = user.id ORDER BY hot DESC",
    findOneByTypeName: "SELECT * FROM type WHERE typeName = ?",
    findOneByComAndType:
        "SELECT * FROM competition_type WHERE comId = ? AND typeId = ?",
    findOneByCom: "SELECT * FROM competition_type WHERE comId = ?",
    findAll: "SELECT * FROM type",
};

export default type;
