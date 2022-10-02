import Validator from "validatorjs";
import { validationRules, errResponse } from "../helpers/index.js";

export const validateMassBooking = (req, res, next) => {
  const validation = new Validator(req.body, validationRules);
  if (validation.fails()) return errResponse(res, 422, validation.errors.all());
  return next();
};
