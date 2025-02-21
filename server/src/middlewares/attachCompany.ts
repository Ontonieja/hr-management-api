import { NextFunction, Response } from "express";
import { RequestWithUser } from "./isAuth";
import AppError from "../utils/AppError";
import { ERROR_CODE } from "../constants/errorCodes";
import db from "../../prisma/db";

export async function attachCompany(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const { UNAUTHORIZED } = ERROR_CODE;
  if (!req.userId) throw new AppError(UNAUTHORIZED, "Unauthorized", 401);

  const company = await db.company.findUnique({
    where: { userId: req.userId },
  });

  if (!company)
    throw new AppError(
      UNAUTHORIZED,
      "User does not belong to any company",
      403
    );

  req.companyId = company.id;
  next();
}
