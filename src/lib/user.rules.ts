import { check } from "express-validator";

export const userValidationsRules = {
  signup: [
    check("username")
      .escape()
      .notEmpty()
      .withMessage("Benutzername wird benötigt")
      .isLength({ min: 3 })
      .withMessage("Benutzername muss mindestens 3 Zeichen lang sein"),

    check("email")
      .escape()
      .notEmpty()
      .withMessage("E-Mail wird benötigt")
      .isEmail()
      .withMessage("Ungültiges E-Mail-Format"),
    /*   .normalizeEmail(), */

    check("dateOfBirth")
      .optional()
      .isISO8601()
      .toDate()
      .withMessage("Ungültiges Datumsformat für Geburtsdatum"),

    check("password")
      .escape()
      .notEmpty()
      .withMessage("Passwort wird benötigt")
      .isLength({ min: 8 })
      .withMessage("Passwort muss mindestens 8 Zeichen lang sein")
      .matches(/\d/)
      .withMessage("Passwort muss mindestens eine Ziffer enthalten")
      .matches(/[a-zA-Z]/)
      .withMessage("Passwort muss mindestens einen Buchstaben enthalten"),

    check("confirmPassword")
      .escape()
      .notEmpty()
      .withMessage("Bestätigung des Passworts wird benötigt")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Passwörter stimmen nicht überein"),
  ],

  signin: [
    check("email")
      .escape()
      .notEmpty()
      .withMessage("E-Mail wird benötigt")
      .isEmail()
      .withMessage("Ungültiges E-Mail-Format"),
    /* .normalizeEmail(), */

    check("password")
      .escape()
      .notEmpty()
      .withMessage("Passwort wird benötigt")
      .isLength({ min: 8 })
      .withMessage("Passwort muss mindestens 8 Zeichen lang sein")
      .matches(/\d/)
      .withMessage("Passwort muss mindestens eine Ziffer enthalten")
      .matches(/[a-zA-Z]/)
      .withMessage("Passwort muss mindestens einen Buchstaben enthalten"),
  ],
  resetPassword: [
    check("password")
      .escape()
      .notEmpty()
      .withMessage("Passwort wird benötigt")
      .isLength({ min: 8 })
      .withMessage("Passwort muss mindestens 8 Zeichen lang sein")
      .matches(/\d/)
      .withMessage("Passwort muss mindestens eine Ziffer enthalten")
      .matches(/[a-zA-Z]/)
      .withMessage("Passwort muss mindestens einen Buchstaben enthalten"),

    check("confirmPassword")
      .escape()
      .notEmpty()
      .withMessage("Bestätigung des Passworts wird benötigt")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Passwörter stimmen nicht überein"),
  ],
};
