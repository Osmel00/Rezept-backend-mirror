import { Request, Response, NextFunction } from "express";
import { HandlerError } from "../types/user";

export function errorHandler(
  err: HandlerError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message,
  });
}
