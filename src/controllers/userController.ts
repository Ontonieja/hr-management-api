import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response): Promise<any> => {
  return res.send("created user");
};
