import express from "express";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler";
import cors from "cors";
import companyRoutes from "./routes/company";
import dashboardRoutes from "./routes/dashboard";
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

app.use(cors(corsOptions));

app.use(`/api/v1/auth`, authRoutes);
app.use(`/api/v1/company`, companyRoutes);
app.use(`/api/v1/dashboard`, dashboardRoutes);

app.use(errorHandler);
export default app;
