import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";

const tryCatch =
  (controller: (req: Request, res: Response) => Promise<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (error) {
      return next(error);
    }
  };

export default tryCatch;
