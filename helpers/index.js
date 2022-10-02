export const validationRules = {
  firstName: "required|string",
  lastName: "required|string",
  email: "required|email",
  startDate: "required|date",
  endDate: "required|date",
  amountDeposited: "required|numeric",
  phoneNumber: "required|string",
  massIntention: "required|string",
  preferredWeekdayMass: "string",
  preferredSundayMass: "string",
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
