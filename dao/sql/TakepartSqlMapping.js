/*
 * @Author: chenanran
 * @Date: 2021-03-27 14:26:43
 */

const takepart = {
    add: "INSERT INTO student_competition(stuId, comId) VALUES(?, ?)",
    delete: "DELETE FROM student_competition WHERE stuId = ? AND comId = ?",
    findComByStuId:
        "SELECT * from student_competition, competition WHERE student_competition.stuId = ? AND student_competition.comId = competition.id",
    findOneByStuIdAndComId:
        "SELECT * FROM student_competition WHERE stuId = ? AND comId = ?",
};

export default takepart;
