/*
 * @Author: chenanran
 * @Date: 2021-03-27 17:41:26
 */

const type = {
    add: "INSERT INTO competition_type(comId, typeId) VALUES (?,?)",
    delete: "DELETE FROM competition_type WHERE comId = ?",
    findTypeByCom:
        "SELECT * FROM competition_type,type WHERE competition_type.comId = ? AND competition_type.typeId = type.typeId",
    findComByType:
        "SELECT * FROM competition, competition_type WHERE competition_type.typeId = ? AND competition_type.comId = competition.id ORDER BY date DESC",
    findOneByType: "SELECT * FROM type WHERE typeId = ?",
    findOneByComAndType:
        "SELECT * FROM competition_type WHERE comId = ? AND typeId = ?",
    findOneByCom: "SELECT * FROM competition_type WHERE comId = ?",
};

export default type;
