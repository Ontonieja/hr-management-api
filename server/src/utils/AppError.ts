export default class AppError extends Error {
  errorCode: number;
  statusCode: number = 500;

  constructor(errorCode: number, message: string, statusCode: number) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}
