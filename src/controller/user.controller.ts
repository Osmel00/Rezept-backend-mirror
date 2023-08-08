import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { createUser, loginModel, verifyEmailModel } from "../model/user.model";

export const UserController = {
  //!Register
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, dateOfBirth, password, confirmPassword } =
        req.body;

      // Hash Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

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

      const text = `
      <p>Dear ${newUser.username},</p>
      <p>Thank you for registering with Rezepte-Sharing-Plattform! We're thrilled to have you on board.</p>
      <p>Your account is almost ready. Before you start exploring, please verify your email address by clicking on the link below:</p>
      <p><a href="http://localhost:3000/user/verify/${token}">Verify Email</a></p>
      <p>Verifying your email ensures the security of your account and unlocks all the features and content waiting for you.</p>
      <p>If you have any questions or need assistance, feel free to reach out to our support team at ${process.env.EMAIL}. We're here to help you have a seamless experience with us.</p>
      <p>Once again, welcome to Rezepte-Sharing-Plattform! We can't wait to see you make the most of your time here.</p>
      <p>Best regards,<br />The Rezepte-Sharing-Plattform Team</p>
  `;

      const mailOptions = {
        from: process.env.EMAIL,
        to: newUser.email,
        subject: "Account Verification",
        html: text,
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
  //!VERIFICATION EMAIl
  async verifyEmail(req: Request, res: Response) {
    try {
      const { token } = req.params;
      const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string
      ) as {
        email: string;
      };

      const userVerified = await verifyEmailModel(decodedToken.email);

      if (!userVerified) {
        return res
          .status(404)
          .json({ message: "Please verify your email before logging in." });
      }

      const successMessage = `<html>
      <head>
        <title>Email Verification Success</title>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #ccc;
          }

          .card {
            width: 500px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            text-align: center;
          }

          .success-icon {
            color: #33cc33;
            font-size: 48px;
            margin-bottom: 10px;
          }

          .message {
            font-size: 2rem;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="success-icon">✓</div>
          <div class="message">
            <p>Your email has been successfully verified!</p>
          </div>
        </div>
      </body>
              </html>`;

      res.status(200).send(successMessage);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while verifying email." });
    }
  },

  //! Login
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await loginModel(email, password);

      // user not found
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password." });
      }

      //compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Password does not match!" });
      }
      // user verified
      if (!user.isVerified) {
        return res.status(401).json({
          error: "Please verify your email before logging in.",
        });
      }

      // Create JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({ message: "Login successful.", user, token });
    } catch (error) {
      next(error);
    }
  },
};
