export class AppError extends Error {
    statusCode: number;
    constructor (message: string, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

//use like this
TODO:// throw new AppError("User not found", 404);
