/*
 * @Author: chenanran
 * @Date: 2021-03-29 16:19:07
 */

const message = {
    add: "INSERT INTO message(comId, stuId, teaId, detail) VALUES (?,?,?,?)",
    delete: "DELETE FROM message WHERE id = ?",
    update: "UPDATE message SET detail = ? WHERE id = ?",
    updateRead: "UPDATE message SET isRead = ? WHERE id = ?",
    findOneByComAndTea: "SELECT * FROM message WHERE comId = ? AND teaId = ?",
    findOneByTea: "SELECT * FROM message WHERE teaId = ?",
    findOneByStu: "SELECT * FROM message WHERE stuID = ?",
    findReadByStu: "SELECT * FROM message WHERE stuId = ? AND isRead = true",
    findUnreadByStu: "SELECT * FROM message WHERE stuId = ? AND isRead = false",
    findOneByComAndStu: "SELECT * FROM message WHERE comId = ? AND stuId = ?",
    findOneById: "SELECT * FROM message WHERE id = ?",
};

export default message;
