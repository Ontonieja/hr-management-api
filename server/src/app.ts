import express from "express";
import userRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler";
import cors from "cors";
import companyRoutes from "./routes/company";
const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

console.log(process.env.CLIENT_URL);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors(corsOptions));

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/company", companyRoutes);

app.use(errorHandler);
export default app;
