import { Request, Response, NextFunction } from "express";

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  dateOfBirth?: Date;
  isVerified: boolean;
  verificationCodeForgotPassword: string;
  info?: string[];
  image?: string[];
  like?: number;
  wishlist?: string[];
 
}

export type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type ValidationErrorHandler = (
  inputs: MiddlewareFunction[]
) => MiddlewareFunction[];

export interface HandlerError extends Error {
  statusCode?: number;
}
