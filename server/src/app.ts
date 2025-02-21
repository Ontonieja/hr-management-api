import express from "express";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler";
import cors from "cors";
import companyRoutes from "./routes/company";
import dashboardRoutes from "./routes/dashboard";
import payrollRoutes from "./routes/payroll";
import generateMonthlyPayrolls from "./utils/payrollCron";
import cron from "node-cron";

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
const BASE_URL = process.env.BASE_URL;
console.log(BASE_URL);
console.log(process.env.CLIENT_URL);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

cron.schedule("30 9 13 * *", generateMonthlyPayrolls);

console.log("CRON Job ustawiony: Payroll będzie tworzony co miesiąc");

app.use(cors(corsOptions));

app.use(`/api/v1/auth`, authRoutes);
app.use(`/api/v1/company`, companyRoutes);
app.use(`/api/v1/dashboard`, dashboardRoutes);
app.use(`/api/v1/payroll`, payrollRoutes);

app.use(errorHandler);
export default app;
