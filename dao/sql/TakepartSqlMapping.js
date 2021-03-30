***REMOVED***
***REMOVED***
 * @Date: 2021-03-27 14:26:43
***REMOVED***

const takepart = {
    add: "INSERT INTO student_competition(stuId, comId) VALUES(?, ?)",
    delete: "DELETE FROM student_competition WHERE stuId = ? AND comId = ?",
    findComByStuId:
        "SELECT * from student_competition, competition WHERE student_competition.stuId = ? AND student_competition.comId = competition.id",
    findStuByCom: "SELECT * from student_competition, user WHERE student_competition.comId = ? AND student_competition.stuId = user.id",
    findOneByStuIdAndComId:
        "SELECT * FROM student_competition WHERE stuId = ? AND comId = ?",
***REMOVED***;

export default takepart;
