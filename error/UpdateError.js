/*
 * @Author: chenanran
 * @Date: 2021-03-25 11:37:55
 */

class UpdateError extends Error {
    constructor(message) {
        super(message);
        this.name = "UpdateError";
    }
}

export default UpdateError;
