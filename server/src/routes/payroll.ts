import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import { getDashboard } from "../controllers/dashboard";
import {
  editPayroll,
  getPayrollStats,
  getSalaryHistory,
  markAsCompleted,
} from "../controllers/payroll";
import { attachCompany } from "../middlewares/attachCompany";

const router = Router();

router.get("/get-stats", isAuth, attachCompany, getPayrollStats);
router.patch("/edit-payroll", isAuth, attachCompany, editPayroll);
router.patch("/mark-as-completed", isAuth, markAsCompleted);
router.get("/get-salary-history", isAuth, getSalaryHistory);

export default router;
