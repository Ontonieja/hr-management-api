import { getDashboardService } from "../services/dashboardService";
import {
  editPayrollService,
  getPayrollStatsService,
  getSalaryHistoryService,
  toggleStatusService,
} from "../services/payrollService";
import tryCatch from "../utils/tryCatch";

export const getPayrollStats = tryCatch(getPayrollStatsService);
export const editPayroll = tryCatch(editPayrollService);
export const markAsCompleted = tryCatch(toggleStatusService);
export const getSalaryHistory = tryCatch(getSalaryHistoryService);
