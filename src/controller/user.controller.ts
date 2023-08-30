import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import {
  createUser,
  getSingleUser,
  loginModel,
  verifyEmailModel,
} from "../model/user.model";
import UserModel from "../model/user.schema";
import ContactModel from "../model/contact.schema";
import mongoose from "mongoose";

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
      <p>Liebe*r ${newUser.username},</p>
      <p>Vielen Dank für die Registrierung bei Tasty Pixel! Wir freuen uns, dich an Bord zu haben.</p>
      <p>Dein Konto ist fast fertig. Bevor du loslegst, verifiziere bitte deine E-Mail-Adresse, indem du auf den folgenden Link klickst:</p>
      <p><a href="http://localhost:3000/user/verifizieren/${token}">E-Mail verifizieren</a></p>
      <p>Die Verifizierung deiner E-Mail sichert dein Konto und schaltet alle Funktionen und Inhalte frei, die auf dich warten.</p>
      <p>Bei Fragen oder Unterstützungsbedarf kannst du dich gerne an unser Support-Team unter ${process.env.EMAIL} wenden. Wir sind hier, um dir eine reibungslose Erfahrung zu bieten.</p>
      <p>Nochmals herzlich willkommen bei der Tasty Pixel! Wir sind gespannt darauf, wie du deine Zeit bei uns nutzen wirst.</p>
      <p>Herzliche Grüße,<br />Das Team der Tasty Pixel</p>
  `;

      const mailOptions = {
        from: process.env.EMAIL,

        to: newUser.email,
        subject: "Konto Verifizierung",
        html: text,
      };

      await transporter.sendMail(mailOptions);

      res.status(201).json({
        message:
          "Registrierung erfolgreich. Überprüfe deine E-Mail für die Verifizierungsanweisungen.",
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
        return res.status(404).json({
          message:
            "Bitte verifiziere deine E-Mail-Adresse, bevor du dich einloggst.",
        });
      }

      const successMessage = `<html>
      <head>
        <title>E-Mail Verifizierung erfolgreich</title>
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
            <p>Deine E-Mail wurde erfolgreich verifiziert!</p>
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
        return res
          .status(401)
          .json({ error: "Ungültige E-Mail oder Passwort." });
      }

      // user verified
      if (!user.isVerified) {
        return res.status(401).json({
          error:
            "Bitte verifiziere deine E-Mail-Adresse, bevor du dich einloggst.",
        });
      }

      //compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ error: "Passwort stimmt nicht überein!" });
      }

      // Create JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({ message: "Anmeldung erfolgreich.", user, token });
    } catch (error) {
      next(error);
    }
  },

  //! forgot password
  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: "Benutzer nicht gefunden." });
      }

      const verificationCode = Math.floor(100000 + Math.random() * 900000); //  6-digit verification code
      user.verificationCodeForgotPassword = verificationCode.toString();
      await user.save();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "Bestätigungscode",
        text: `Dein Bestätigungscode lautet: ${verificationCode}`,
      };

      await transporter.sendMail(mailOptions);

      res
        .status(200)
        .json({ message: "Bestätigungscode erfolgreich gesendet.", user });
    } catch (error) {
      console.error("Fehler bei der Generierung des Bestätigungscodes:", error);
      res.status(500).json({
        error:
          "Beim Generieren des Bestätigungscodes ist ein Fehler aufgetreten.",
      });
    }
  },

  //! Verification Code
  async verifyVerificationCode(req: Request, res: Response) {
    try {
      const { verificationCodeForgotPassword } = req.body;
      const { id } = req.params;

      const user = await UserModel.findOne({
        _id: id,
        verificationCodeForgotPassword,
      });

      if (!user) {
        return res.status(400).json({ error: "Ungültiger Bestätigungscode." });
      }

      const token = jwt.sign(
        { username: user.username },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({
        message: "Bestätigungscode erfolgreich gesendet.",
        user,
        token,
      });
    } catch (error) {
      res.status(500).json({
        error:
          "Ein Fehler ist bei der Validierung des Bestätigungscodes aufgetreten.",
      });
    }
  },

  //! ResetPassword
  async resetPassword(req: Request, res: Response) {
    try {
      const { password, confirmPassword } = req.body;
      const { id } = req.params;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await UserModel.findOne({ _id: id });

      if (!user) {
        return res.status(404).json({
          error: "Benutzer nicht gefunden",
        });
      }

      user.password = hashedPassword;
      user.verificationCodeForgotPassword = "";
      await user.save();

      res
        .status(200)
        .json({ message: "Passwortrücksetzung erfolgreich.", user });
    } catch (error) {
      res.status(500).json({
        message:
          "Ein Fehler ist aufgetreten, während das Passwort zurückgesetzt wurde.",
      });
    }
  },
  //!createContact
  async createContact(req: Request, res: Response) {
    try {
      const { username, email, subject, textMessage } = req.body;

      if (!username || !email || !subject || !textMessage) {
        return res.status(400).json({
          error: "Bitte füllen Sie alle erforderlichen Felder aus.",
        });
      }
      const newContact = await new ContactModel({
        username,
        email,
        subject,
        textMessage,
      });
      await newContact.save();

      // Send an email using nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Kontaktformular - Nachrichteneingang",
        text: `Hallo ${username},\n\nVielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten:\n\nIhre Nachricht lautet:\n${textMessage}\n\nWir werden uns in Kürze bei Ihnen melden.\n\nMit freundlichen Grüßen,\nIhr Team von Tasty Pixel`,
      };
      const mailOptions2 = {
        from: process.env.EMAIL,
        to: "charbel.herrera.21@gmail.com",
        subject: "Kontaktformular - Nachrichteneingang",
        text: textMessage,
      };

      await transporter.sendMail(mailOptions);
      await transporter.sendMail(mailOptions2);
      res
        .status(201)
        .json({ message: "Nachricht erfolgreich gesendet", newContact });
    } catch (error) {
      console.error("eeeee", error);
      res.status(500).json({
        error: "Beim Senden der Nachricht ist ein Fehler aufgetreten",
      });
    }
  },
  //!  checkgoogle
  async checkGoogle(req: Request, res: Response, next: NextFunction) {
    try {
      const saltRounds = 10;
      const { username, email, picture } = req.body;

      const randomPassword = Math.random().toString(36).substring(7);
      const hashedPassword = await bcrypt.hash(randomPassword, saltRounds);

      let user = await UserModel.findOne({ email });

      if (!user) {
        user = new UserModel({
          username,
          email,
          password: hashedPassword,
          picture,
          isVerified: true,
        });

        await user.save();
      }

      res
        .status(201)
        .json({ message: "Anmeldung mit Google erfolgreich", user });
    } catch (error) {
      next(error);
    }
  },

  //! getUserById
  async getUserById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Ungültige Benutzer-ID." });
    }
    try {
      const user = await getSingleUser(id);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
};
