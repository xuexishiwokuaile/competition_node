/*
 * @Author: chenanran
 * @Date: 2021-03-26 15:28:56
 */

const competition = {
    add:
        "INSERT INTO competition(name, url, detail, image, teaId, date) VALUES (?,?,?,?,?,?)",
    delete: "DELETE FROM competition WHERE id = ?",
    update:
        "UPDATE competition SET name = ?, url = ?, detail = ?, image = ?, teaId = ? WHERE id = ?",
    findOneById: "SELECT * FROM competition WHERE id = ?",
    findOneByName: "SELECT * FROM competition WHERE name = ?",
    findAllByDate: "SELECT * FROM competition ORDER BY date DESC",
    findAllByHot: "SELECT * FROM competition ORDER BY hot DESC"
};

export default competition;
