import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import tryCatch from "../utils/tryCatch";
import { getDashboard } from "../controllers/dashboard";

const router = Router();

router.get("/get-stats", isAuth, getDashboard);

export default router;
