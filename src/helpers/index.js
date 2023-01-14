import jwt from 'jsonwebtoken';

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

export const userSignInRules = {
  email: "required|email",
  password: "required|string",
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
