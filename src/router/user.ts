import express from "express";
const router = express.Router();

import { UserController } from "../controller/user.controller";
import { userValidationsRules } from "../lib/user.rules";
import { validationError } from "../middelware/validation";

//!register
router.post(
  "/registrieren",
  validationError(userValidationsRules.signup),
  UserController.register
);
//! email validation
router.get("/verifizieren/:token", UserController.verifyEmail);

//!login
router.post(
  "/anmelden",
  validationError(userValidationsRules.signin),
  UserController.login
);
//!forgot password
router.post("/passwort-vergessen", UserController.forgotPassword);

//! verification code
router.post(
  "/verifiziere-verifikationscode/:email",
  UserController.verifyVerificationCode
);

//! reset password
router.put(
  "/passwort-zuruecksetzen/:email",
  validationError(userValidationsRules.resetPassword),
  UserController.resetPassword
);
export default router;
