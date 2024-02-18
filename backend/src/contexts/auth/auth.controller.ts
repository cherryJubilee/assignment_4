import { Router } from "express";
import authService from "./auth.service";

const authController = Router();
authController.post("/sign-up", authService.SignUp);
authController.post("/log-in", authService.LogIn);

export default authController;
