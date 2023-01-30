import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const validationRules = {
  "bookings.*.name": "required|string",
  "bookings.*.email": "required|email",
  "bookings.*.startDate": "required|date",
  "bookings.*.endDate": "required|date",
  "bookings.*.amountPaid": "required|numeric",
  "bookings.*.phoneNumber": "required|string",
  "bookings.*.massIntention": "required|string",
  "bookings.*.bookedBy": "string",
  bookings: "required",
};

export const userValidationRules = {
  name: "required|string",
  email: "required|email",
  password: "required|string",
};

export const updateUserDetails = {
  name: "string",
  email: "email",
  password: "string",
};

export const createUserRules = {
  email: "required|email",
};

export const userSignInRules = {
  email: "required|email",
  password: "required|string",
};

export const sendResetEmailRules = {
  email: "required|email",
};

export const errResponse = (res, statusCode, errors) =>
  res.status(statusCode).json({
    status: "error",
    errors,
  });

export const successResponse = (res, statusCode, data) =>
  res.status(statusCode).json({
    status: "success",
    data,
  });

export const generateToken = (
  payload,
  secretKey = process.env.SECRET,
  duration = { expiresIn: "24hrs" }
) => jwt.sign(payload, secretKey, duration);

export const handleSendMail = async ({ subject, text, email }) => {
  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_GMAIL_ACCOUNT,
      pass: process.env.USER_GMAIL_PASSWORD,
    },
  });

  const mailDetails = {
    from: process.env.USER_GMAIL_ACCOUNT,
    to: email,
    subject,
    text,
  };

  await mailTransporter.sendMail(mailDetails);
};
