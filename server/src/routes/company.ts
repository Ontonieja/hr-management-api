import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import { createCompany } from "../controllers/company";

const router = Router();

router.post("/create-company", isAuth, createCompany);

export default router;
