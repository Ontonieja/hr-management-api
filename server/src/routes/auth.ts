import {
  createAccount,
  loginUser,
  refreshToken,
  userInfo,
} from "../controllers/auth";
import { Router } from "express";
import isAuth, { RequestWithUser } from "../middlewares/isAuth";

const router = Router();

router.post("/register", createAccount);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.get("/user-info", isAuth, userInfo);

export default router;
