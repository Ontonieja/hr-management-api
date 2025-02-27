import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../../prisma/db";
import AppError from "../utils/AppError";
import { ERROR_CODE } from "../constants/errorCodes";
import z, { ZodError } from "zod";
import { RequestWithUser } from "../middlewares/isAuth";

const userSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  firstName: z
    .string()
    .min(1, { message: "firstName must contain at least 1 character" })
    .optional(),
  lastName: z
    .string()
    .min(1, { message: "lastName must contain at least 1 character" })
    .optional(),
});

const {
  NO_HEADERS,
  UNAUTHORIZED,
  INVALID_REQUEST_BODY,
  ALREADY_EXISTS,
  USER_NOT_FOUND,
} = ERROR_CODE;

export const register = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    userSchema.parse({ email, password, firstName, lastName });
  } catch (err) {
    const zodError = err as ZodError;
    throw new AppError(INVALID_REQUEST_BODY, zodError.errors[0].message, 400);
  }

  const existingUser = await db.user.findFirst({
    where: { email },
  });

  if (existingUser) {
    throw new AppError(ALREADY_EXISTS, "User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: "MANAGER",
    },
  });

  const accessToken = jwt.sign(
    { email, userId: user.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "2h",
    }
  );

  const refreshToken = jwt.sign(
    { email, userId: user.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  return res
    .status(201)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      message: "User created successfully",
      accessToken: accessToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
      },
    });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    userSchema.parse({ email, password });
  } catch (err) {
    const zodError = err as ZodError;
    throw new AppError(INVALID_REQUEST_BODY, zodError.errors[0].message, 400);
  }

  const existingUser = await db.user.findFirst({
    where: { email },
  });

  if (!existingUser) {
    throw new AppError(USER_NOT_FOUND, "User does not exist", 400);
  }

  const hashedPassword = await bcrypt.compare(password, existingUser.password);

  if (!hashedPassword)
    throw new AppError(USER_NOT_FOUND, "Invalid Password", 400);

  const accessToken = jwt.sign(
    { email, userId: existingUser.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "2h",
    }
  );

  const refreshToken = jwt.sign(
    { email, userId: existingUser.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  const company = await db.company.findUnique({
    where: { userId: existingUser.id },
  });

  return res
    .status(201)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      message: "User logged in successfully",
      accessToken: accessToken,
      user: {
        id: existingUser.id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        role: existingUser.role,
        email: existingUser.email,
      },
    });
};

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies["refreshToken"] as string;
  console.log(refreshToken);

  if (!refreshToken) {
    throw new AppError(NO_HEADERS, "Headers must include refresh token", 400);
  }

  jwt.verify(refreshToken, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) throw new AppError(UNAUTHORIZED, "Invalid refresh token", 401);

    const payload = decoded as JwtPayload;

    if (!payload.email)
      throw new AppError(UNAUTHORIZED, "Email not found in token payload", 401);

    const accessToken = jwt.sign(
      { email: payload.email, userId: payload.userId },
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" }
    );
    return res.status(200).json({
      message: "Token refreshed successfully",
      accessToken: accessToken,
    });
  });
};

export const getUserInfo = async (req: RequestWithUser, res: Response) => {
  const userId = req.userId;

  if (!userId) throw new AppError(UNAUTHORIZED, "Unauthorized", 401);

  const existingUser = await db.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) throw new AppError(USER_NOT_FOUND, "User not found", 404);

  return res.status(200).json({
    message: "User info fetched successfully",
    user: {
      id: existingUser.id,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      role: existingUser.role,
      email: existingUser.email,
    },
  });
};
