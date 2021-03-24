class AddError extends Error {
    constructor(message) {
        super(message);
        this.name = "AddError";
    }
}

export default AddError;