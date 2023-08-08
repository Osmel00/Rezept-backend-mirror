import { Request, Response, NextFunction } from "express";

export interface User {
  username: string;
  email: string;
  password: string;
  /*   confirmPassword: string; */
  dateOfBirth: Date;
  isVerified: boolean;
  verificationCodeForgotPassword: string;
  registrationDate: Date;
  info: string[];
  image: string[];
  like: number;
  wishlist: string[];
}

export type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type ValidationErrorHandler = (
  inputs: MiddlewareFunction[]
) => MiddlewareFunction[];
