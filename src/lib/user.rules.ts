import { check } from "express-validator";

export const userValidationsRules = {
  signup: [
    check("username")
      .escape()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    /*  .trim(), */

    check("email")
      .escape()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail(),

    check("dateOfBirth")
      .optional()
      .isISO8601()
      .toDate()
      .withMessage("Invalid date format for date of birth"),

    check("password")
      .escape()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/\d/)
      .withMessage("Password must contain at least one digit")
      .matches(/[a-zA-Z]/)
      .withMessage("Password must contain at least one letter"),

    check("confirmPassword")
      .escape()
      .notEmpty()
      .withMessage("Confirm Password is required")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Passwords do not match"),
  ],
};
