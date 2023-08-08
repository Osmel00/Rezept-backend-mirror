import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { createUser } from "../model/user.model";

export const UserController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, dateOfBirth, password, confirmPassword } =
        req.body;

      // Hash Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Get date and time
      const registrationDate = new Date();

      // Create User
      const newUser = await createUser(
        username,
        email,
        hashedPassword,
        dateOfBirth
      );
      // Create verification token
      const token = jwt.sign(
        { email: newUser.email },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
          expiresIn: "1d",
        }
      );

      // Send verification email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: newUser.email,
        subject: "Account Verification",
        html: `<p>Click <a href="http://localhost:3000/user/register/${token}">here</a> to verify your email.</p>`,
      };

      await transporter.sendMail(mailOptions);

      res.status(201).json({
        message:
          "Registration successful. Check your email for verification instructions.",
        newUser,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
};
