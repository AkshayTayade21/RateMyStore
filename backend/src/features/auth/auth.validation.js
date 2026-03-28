import { body } from "express-validator";

export const registerValidation = [
  body("name")
    .isLength({ min: 20, max: 60 })
    .withMessage("Name must be 20 to 60 characters"),

  body("email")
    .isEmail()
    .withMessage("Invalid email"),

  body("address")
    .isLength({ max: 400 })
    .withMessage("Address must be max 400 characters"),

  body("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be 8 to 16 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must have one uppercase letter")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must have one special character"),
];

export const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

export const updatePasswordValidation = [
  body("currentPassword").notEmpty().withMessage("Current password is required"),
  body("newPassword")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be 8 to 16 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must have one uppercase letter")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must have one special character"),
];