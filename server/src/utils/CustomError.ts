export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 500) {
    super(message);

    // Restore prototype chain (important when extending built-ins like Error in TypeScript)
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = true; // Optional: helps with distinguishing known vs unknown errors

    Error.captureStackTrace(this, this.constructor);
  }
}

//use like this
// throw new AppError("User not found", 404);
