import { createAccount, loginUser, refreshToken } from "../controllers/auth";
import { Router } from "express";
import isAuth from "../middlewares/isAuth";

const router = Router();

router.post("/register", createAccount);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);

router.get("/protected-route", isAuth, (req, res) => {
  res.status(200).json({ message: "This is protected route for testing" });
});
export default router;
