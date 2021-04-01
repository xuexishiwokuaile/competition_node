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
        "SELECT * FROM competition, competition_type, type WHERE type.typeName = ? AND competition_type.typeId = type.typeId AND competition_type.comId = competition.id ORDER BY date DESC",
    findComByTypeAndHot:
        "SELECT * FROM competition, competition_type, type WHERE type.typeName = ? AND competition_type.typeId = type.typeId AND competition_type.comId = competition.id ORDER BY hot DESC",
    findOneByTypeName: "SELECT * FROM type WHERE typeName = ?",
    findOneByComAndType:
        "SELECT * FROM competition_type WHERE comId = ? AND typeId = ?",
    findOneByCom: "SELECT * FROM competition_type WHERE comId = ?",
};

export default type;
