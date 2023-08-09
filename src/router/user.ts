import express from "express";
const router = express.Router();

import { UserController } from "../controller/user.controller";
import { userValidationsRules } from "../lib/user.rules";
import { validationError } from "../middelware/validation";

//!register
router.post(
  "/register",
  validationError(userValidationsRules.signup),
  UserController.register
);
//! email validation
router.get("/verify/:token", UserController.verifyEmail);

//!login
router.post(
  "/login",
  validationError(userValidationsRules.signin),
  UserController.login
);
//!forgot password
router.post("/forgot-password", UserController.forgotPassword);

//! verification code
router.post(
  "/verify-verification-code/:email",
  UserController.verifyVerificationCode
);
export default router;
