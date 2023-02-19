import { v4 as uuidv4 } from "uuid";
import * as argon from "argon2";

import models from "../models";
import {
  errResponse,
  successResponse,
  generateToken,
  handleSendMail,
} from "../helpers/index.js";

const { User, sequelize } = models;

export const adminSignup = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return errResponse(res, 409, "User Already Exists");
    }

    const user = await User.create({ ...req.body, isSuperAdmin: true });

    const payload = user.getSafeDataValues();

    payload.token = generateToken(payload);

    return successResponse(res, 201, payload);
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export const processPayload = (req) => {
  const payload = { ...req.user };

  delete payload.password;

  payload.token = generateToken(payload);

  return payload;
};

export const signIn = (req, res) => {
  try {
    const payload = processPayload(req);

    return successResponse(res, 200, payload);
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export const sendPasswordResetEmail = async (req, res) => {
  const email = req.params.email;

  const passwordResetLink = `${process.env.REACT_APP_URL}/resetPassword?email=${email}`;

  const subject = "Password Reset";
  const text = `Please use this link to reset your password ${passwordResetLink}`;

  try {
    await handleSendMail({ subject, text, email });

    return successResponse(res, 200, "Email Sent successfully");
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export const resetUserPassword = async (req, res) => {
  try {
    const hashedPassword = await argon.hash(req.body.password);

    await User.update(
      { password: hashedPassword },
      { where: { email: req.params.email } }
    );

    return successResponse(res, 200, "Password updated successfully");
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export const createNewUser = async (req, res) => {
  const email = req.body.email;

  try {
    sequelize.transaction(async (transaction) => {
      const existingUser = await User.findOne({
        where: { email },
      });

      if (existingUser) {
        return errResponse(res, 409, "User Already Exists");
      }

      const password = uuidv4();

      await User.create({ ...req.body, password }, { transaction });

      const loginLink = `${process.env.REACT_APP_URL}/signin`;

      const subject = "Your Login Details";

      const text = `
        Please use these details to sign in on ${loginLink}
        Email: ${email}
        Password: ${password}
      `;

      await handleSendMail({ subject, text, email });
      return successResponse(res, 201, "User created successfully");
    });
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export const updateUserData = async (req, res) => {
  const userId = Number(req.params.id);

  try {
    const existingUser = await User.findOne({
      where: { id: userId },
    });

    if (!existingUser) {
      return errResponse(res, 404, "User Not Found");
    }

    const email = req.body.email;

    if (email) {
      const duplicateUser = await User.findOne({
        where: { email },
      });

      if (duplicateUser && duplicateUser.id !== userId) {
        return errResponse(res, 409, "Email Already in use");
      }
    }

    await User.update({ ...req.body }, { where: { id: userId } });

    return successResponse(res, 200, "User updated successfully");
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export const getUser = (req, res) => {
  try {
    const payload = processPayload(req);

    return successResponse(res, 200, payload);
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};
