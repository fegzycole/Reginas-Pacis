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
