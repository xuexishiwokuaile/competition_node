class DeleteError extends Error {
    constructor(message) {
        super(message);
        this.name = "DeleteError";
    }
}

export default DeleteError;