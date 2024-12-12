import { Request, Response } from "express";
import { login, refresh, register } from "../services/authService";
import tryCatch from "../utils/tryCatch";

export const createAccount = tryCatch(register);
export const loginUser = tryCatch(login);
export const refreshToken = tryCatch(refresh);
