import nodemailer from "nodemailer";
import models from "../models";
import {
  errResponse,
  successResponse,
  generateToken,
} from "../helpers/index.js";

const { User } = models;

export const signupUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return errResponse(res, 409, "User Already Exists");
    }

    const user = await User.create(req.body);

    const payload = user.getSafeDataValues();

    payload.token = generateToken(payload);

    return successResponse(res, 201, payload);
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export const signIn = async (req, res) => {
  try {
    const payload = req.user;

    payload.token = generateToken(payload);

    return successResponse(res, 200, payload);
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export const sendPasswordResetEmail = async (req, res) => {
  const email = req.params.email;

  const passwordResetLink = `${process.env.REACT_APP_URL}/resetPassword?email=${email}`;

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
    subject: "Password Reset",
    text: `Please use this link to reset your password ${passwordResetLink}`,
  };

  try {
    await mailTransporter.sendMail(mailDetails);
    return successResponse(res, 200, "Email Sent successfully");
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};
