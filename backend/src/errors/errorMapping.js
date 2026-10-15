

const errorMapping = {
    ValidationError: 400,
    NotFoundError: 404,
    NotAuthenticatedError: 401,
    AppError: 500,
    ConflictError: 409,
}

module.exports = errorMapping;