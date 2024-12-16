import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../utils/AppError";
import { ERROR_CODE } from "../constants/errorCodes";

interface JWTPayloadWithEmail extends JwtPayload {
  email: string;
}

export default function isAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(" ")[1];

  const { NO_HEADERS, UNAUTHORIZED } = ERROR_CODE;

  if (!token) throw new AppError(NO_HEADERS, "No acces token provided", 400);

  jwt.verify(token, process.env.JWT_SECRET as string, (error, decoded) => {
    if (error) throw new AppError(UNAUTHORIZED, "User not authorized", 400);
    const payload = decoded as JWTPayloadWithEmail;
    next();
  });
}
