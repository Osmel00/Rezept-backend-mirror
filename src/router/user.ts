import express from "express";
const router = express.Router();

import { UserController } from "../controller/user.controller";
import { userValidationsRules } from "../lib/user.rules";
import { validationError } from "../middelware/validation";

router.post(
  "/register",
  validationError(userValidationsRules.signup),
  UserController.register
);

export default router;
