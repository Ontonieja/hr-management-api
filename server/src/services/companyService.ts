import { Request, Response } from "express";
import { RequestWithUser } from "../middlewares/isAuth";
import db from "../../prisma/db";
import AppError from "../utils/AppError";
import { ERROR_CODE } from "../constants/errorCodes";
import { create } from "domain";
import { connect } from "http2";

const { UNAUTHORIZED, INVALID_REQUEST_BODY } = ERROR_CODE;
export const createCompanyService = async (
  req: RequestWithUser,
  res: Response
) => {
  const { companyName, industry, address, city, zip, country } = req.body;
  const { userId } = req;

  if (!userId) throw new AppError(UNAUTHORIZED, "Unauthorized", 403);

  if (!companyName || !industry || !address || !city || !zip || !country) {
    throw new AppError(UNAUTHORIZED, "Missing required fields", 400);
  }
};
