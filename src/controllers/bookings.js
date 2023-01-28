import moment from "moment";
import models from "../models";
import { errResponse, successResponse } from "../helpers/index.js";
import { Op } from "sequelize";

const { Booking, sequelize } = models;

const format = "DD-MM-YYYY";

/**
 * Gets all mass bookings in the DB
 * @param {*} req request object
 * @param {*} res response object
 */
export const getMassBookings = async (req, res) => {
  try {
    const { startDate, endDate, type } = req.query;

    const where = {
      ...(startDate && {
        startDate: {
          [Op.gte]: moment(startDate, format).startOf("day"),
        },
      }),
      ...(endDate && {
        endDate: {
          [Op.lte]: moment(endDate, format).endOf("day"),
        },
      }),
      ...(type && {
        startDate: {
          [Op.gte]: moment().startOf(type).startOf("day"),
        },
        endDate: {
          [Op.lte]: moment().endOf(type).endOf("day"),
        },
      }),
    };

    const massBookings = await Booking.findAll({
      where,
      order: [["startDate", "DESC"]],
    });

    const bookingsToJSON = massBookings.map((booking) => booking.toJSON());

    return successResponse(res, 200, bookingsToJSON);
  } catch (error) {
    return errResponse(res, 500, error.message);
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

    const totalAmountPaid = bookings.reduce(
      (total, currBooking) => total + currBooking.amountPaid,
      0
    );

    sequelize.transaction(async (transaction) => {
      await Booking.bulkCreate(bookings, { transaction });
    });

    const responseData = {
      amountPaid: totalAmountPaid,
      name: bookings[0].name,
      phoneNumber: bookings[0].phoneNumber,
      email: bookings[0].email,
    };

    return successResponse(res, 201, responseData);
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};
