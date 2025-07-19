export class BaseException extends Error {
  constructor(
    readonly message: string,
    readonly statusCode: number,
    readonly errorCode: string,
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      errorCode: this.errorCode,
    };
  }
}