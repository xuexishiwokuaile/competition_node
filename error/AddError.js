/*
 * @Author: chenanran
 * @Date: 2021-03-23 16:30:37
 */

class AddError extends Error {
    constructor(message) {
        super(message);
        this.name = "AddError";
    }
}

export default AddError;
