class NotAuthenticatedError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotAuthenticatedError";
    }
}

module.exports = NotAuthenticatedError;