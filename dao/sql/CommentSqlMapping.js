***REMOVED***
***REMOVED***
 * @Date: 2021-03-31 13:47:17
***REMOVED***

const comment = {
    add: "INSERT INTO comment(comId, stuId, detail, date) VALUES (?,?,?,?)",
    delete: "DELETE FROM comment WHERE id = ?",
    update: "UPDATE comment SET detail = ? WHERE id = ?",
    findOneById: "SELECT * FROM comment WHERE id = ?",
    findOneByStu: "SELECT * FROM comment WHERE stuId = ? ORDER BY date DESC",
    findOneByCom: "SELECT * FROM comment WHERE comId = ? ORDER BY date DESC",
***REMOVED***;

export default comment;
