import { getDashboardService } from "../services/dashboardService";
import tryCatch from "../utils/tryCatch";

export const getDashboard = tryCatch(getDashboardService);
