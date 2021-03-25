***REMOVED***
***REMOVED***
 * @Date: 2021-03-23 14:42:14
***REMOVED***

const user = {
    add:
        "INSERT INTO user(name, password, phone, roleId, gender) VALUES (?,?,?,0,?)",
    delete: "DELETE FROM user WHERE id=?",
    updatePassword: "UPDATE user SET password=? WHERE id=?",
    findOneById: "SELECT * FROM user WHERE id=?",
    findOneByName: "SELECT * FROM user WHERE name=?",
    findAll: "SELECT * FROM user",
***REMOVED***;

export default user;
