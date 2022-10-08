export const validationRules = {
  'bookings.*.firstName': "required|string",
  'bookings.*.lastName': "required|string",
  'bookings.*.email': "required|email",
  'bookings.*.startDate': "required|date",
  'bookings.*.endDate': "required|date",
  'bookings.*.amountPayed': "required|numeric",
  'bookings.*.phoneNumber': "required|string",
  'bookings.*.massIntention': "required|string",
  'bookings.*.preferredWeekdayMass': "required|string",
  'bookings.*.preferredSundayMass': "required|string",
  'bookings.*.bookedBy': "string",
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
