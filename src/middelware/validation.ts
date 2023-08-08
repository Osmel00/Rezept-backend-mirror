import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ValidationErrorHandler } from "../types/user";

export const validationError: ValidationErrorHandler = (inputs) => {
  return [
    ...inputs,
    function (req: Request, res: Response, next: NextFunction) {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        return next();
      }

      const extractedErrors = errors.array().map((err) => err.msg);
      res.status(422).json({ errors: extractedErrors });
    },
  ];
};
