import express from "express";
import userRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/auth", userRoutes);

app.use(errorHandler);
export default app;
