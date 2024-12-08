import { createUser } from "../controllers/userController";
import { Router } from "express";

const router = Router();

router.get("/create-user", createUser);

export default router;
