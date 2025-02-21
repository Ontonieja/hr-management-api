import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../utils/AppError";
import { ERROR_CODE } from "../constants/errorCodes";

interface JWTPayloadWithEmail extends JwtPayload {
  email: string;
}
export interface RequestWithUser extends Request {
  userId?: number;
  companyId?: number;
}

export default function isAuth(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const { NO_HEADERS, UNAUTHORIZED } = ERROR_CODE;

  if (!req.headers || !req.headers.authorization) {
    return next(new AppError(NO_HEADERS, "No access token provided", 401));
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return next(new AppError(NO_HEADERS, "No access token provided", 401));
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (error, decoded) => {
    if (error) {
      return next(new AppError(UNAUTHORIZED, "Unauthorized", 401));
    }

    const payload = decoded as JWTPayloadWithEmail;
    req.userId = payload.userId;
    next();
  });
}
