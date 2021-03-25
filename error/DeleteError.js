/*
 * @Author: chenanran
 * @Date: 2021-03-24 16:45:59
 */

class DeleteError extends Error {
    constructor(message) {
        super(message);
        this.name = "DeleteError";
    }
}

export default DeleteError;
