import Validator from "validatorjs";
import bcrypt from "bcryptjs";
import {
  validationRules,
  errResponse,
  userValidationRules,
  userSignInRules,
  sendResetEmailRules,
} from "../helpers";
import models from "../models";

const { User } = models;

export const validateMassBooking = (req, res, next) => {
  const validation = new Validator(req.body, validationRules);
  if (validation.fails()) return errResponse(res, 422, validation.errors.all());
  return next();
};

export const validateUserSignup = (req, res, next) => {
  const validation = new Validator(req.body, userValidationRules);
  if (validation.fails()) return errResponse(res, 422, validation.errors.all());
  return next();
};

export const validateUserSignIn = (req, res, next) => {
  const validation = new Validator(req.body, userSignInRules);
  if (validation.fails()) return errResponse(res, 422, validation.errors.all());
  return next();
};

export const validateSendResetEmail = (req, res, next) => {
  const validation = new Validator(req.params, sendResetEmailRules);
  if (validation.fails()) return errResponse(res, 422, validation.errors.all());
  return next();
};

export const checkUserEmail = async (req, res, next) => {
  try {
    let email;

    if (req.body.email) {
      email = req.body.email;
    }

    if (req.params.email) {
      email = req.params.email;
    }

    let user;

    user = await User.findOne({ where: { email } });

    if (!user) {
      return errResponse(res, 404, "User does not exist");
    }

    req.user = user;
    return next();
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export const compareUserPassword = (req, res, next) => {
  const passwordInDb = req.user.password;
  const passwordInRequest = req.body.password;
  const passwordMatches = bcrypt.compareSync(passwordInRequest, passwordInDb);
  if (!passwordMatches) {
    return errResponse(
      res,
      401,
      "Authentication Failed, Email or Password Incorrect"
    );
  }
  req.user = req.user.getSafeDataValues();

  return next();
};
