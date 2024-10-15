export class HttpException extends Error {
  public message: string;
  public errorCode: any;
  public statusCode: number;
  public errors: ErrorCodes | null;

  constructor(
    message: string,
    errorCode: any,
    statusCode: number,
    errors: ErrorCodes | null
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export enum ErrorCodes {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  INVALID_PASSWORD = 1003,
  UNPROCESSABLE_ENTITY = 2001,
  INTERNAL_EXCEPTION = 5001,
}
