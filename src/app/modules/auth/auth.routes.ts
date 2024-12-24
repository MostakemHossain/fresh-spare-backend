import express from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import authValidations from "./auth.validation";
const router= express.Router();

router.post("/login",validateRequest(authValidations.loginValidationSchema),authController.loginUserController)

export const AuthRoutes= router