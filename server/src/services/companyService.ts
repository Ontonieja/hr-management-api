import { Request, Response } from "express";
import { RequestWithUser } from "../middlewares/isAuth";
import db from "../../prisma/db";
import AppError from "../utils/AppError";
import { ERROR_CODE } from "../constants/errorCodes";

const { UNAUTHORIZED, INVALID_REQUEST_BODY } = ERROR_CODE;
export const createCompanyService = async (
  req: RequestWithUser,
  res: Response
) => {
  const { companyName, industry, address, city, zip, country } = req.body;
  const { userId } = req;

  if (!userId) throw new AppError(UNAUTHORIZED, "Unauthorized", 401);
  if (!companyName || !industry || !address || !city || !zip || !country) {
    throw new AppError(INVALID_REQUEST_BODY, "Missing required fields", 400);
  }

  const company = await db.company.create({
    data: {
      name: companyName,
      industry,
      address,
      city,
      zipCode: zip,
      country,
      userId,
    },
  });

  return res.status(201).json({ message: "Company created successfully" });
};
