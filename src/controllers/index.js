import models from "../models";
import { errResponse, successResponse } from "../helpers/index.js";

const { Booking, sequelize } = models;

/**
 * Gets all mass bookings in the DB
 * @param {*} req request object
 * @param {*} res response object
 */
export const getMassBookings = async (_req, res) => {
  try {
    const massBookings = await Booking.findAll();

    const bookingsToJSON = massBookings.map((booking) => booking.toJSON());

    successResponse(res, 200, bookingsToJSON);
  } catch (error) {
    errResponse(res, 500, error.message);
  }
};

/**
 * Creates a new mass booking
 * @param {*} req request object
 * @param {*} res response object
 */
export const createMassBooking = async (req, res) => {
  try {
    const { bookings } = req.body;

    sequelize.transaction(async (transaction) => {
      await Booking.bulkCreate(bookings, { transaction });
    });

    successResponse(res, 201, "Booking(s) created successfully");
  } catch (error) {
    errResponse(res, 500, error.message);
  }
};
