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
