import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  if (err.name === "PrismaClientInitializationError") {
    return res.status(500).json({
      message: "Failed to initialize database connection.",
      errorCode: 302,
    });
  }

  if (err.name === "PrismaClientKnownRequestError") {
    return res.status(400).json({
      message: "Database request error.",
      errorCode: 303,
    });
  }

  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, errorCode: err.errorCode });
  }

  return res.status(500).json({ message: "Something went wrong" });
};

export default errorHandler as (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => void;
