/*
 * @Author: chenanran
 * @Date: 2021-03-25 15:49:56
 */

class UserError extends Error {
    constructor(message) {
        super(message);
        this.name = "UserError";
    }
}

export default UserError;
