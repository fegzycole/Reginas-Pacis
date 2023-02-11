import moment from "moment";
import { Op, literal, fn, col } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import models from "../models";
import { errResponse, successResponse } from "../helpers/index.js";

const { Booking, sequelize } = models;

const format = "DD-MM-YYYY";

const generateWhereClause = ({ startDate, endDate, type, date }) => {
  return {
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
    ...(date && {
      startDate: {
        [Op.gte]: moment(date, format).startOf("day"),
      },
      endDate: {
        [Op.lte]: moment(date, format).endOf("day"),
      },
    }),
  };
};

/**
 * Gets all mass bookings in the DB
 * @param {*} req request object
 * @param {*} res response object
 */
export const getMassBookings = async (req, res) => {
  try {
    const { startDate, endDate, type } = req.query;

    const where = generateWhereClause({ startDate, endDate, type });

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

    const uniqueBookingId = `${uuidv4()}-${totalAmountPaid}`;

    const normalizedBookings = bookings.map((booking) => ({
      ...booking,
      uniqueBookingId,
    }));

    sequelize.transaction(async (transaction) => {
      await Booking.bulkCreate(normalizedBookings, { transaction });
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

export const getFiveLatestBookings = async (_req, res) => {
  try {
    const massBookings = await Booking.findAll({
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    const bookingsToJSON = massBookings.map((booking) => booking.toJSON());

    return successResponse(res, 200, bookingsToJSON);
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export const getBookingsStats = async (req, res) => {
  const { startDate, endDate, type } = req.query;

  const where = generateWhereClause({ startDate, endDate, type });

  const {
    bookedBy: { field: bookedBy },
    uniqueBookingId: { field: uniqueBookingId },
  } = Booking.getAttributes();

  const amountPaid = [literal(`SUM(amountPaid)`), "amountPaid"];
  const totalMassesBooked = [literal(`COUNT(*)`), "totalMassesBooked"];

  try {
    const bookings = await Booking.findAll({
      attributes: [bookedBy, amountPaid, totalMassesBooked],
      where,
      group: [uniqueBookingId],
    });

    const statData = await Booking.findOne({
      attributes: [[fn("SUM", sequelize.col("amountPaid")), "totalAmountPaid"]],
      raw: true,
    });

    let totalAmountPaidForPeriod = 0;
    let totalBookingsForPeriod = 0;

    bookings.forEach((booking) => {
      const normalizedBooking = booking.toJSON();

      totalAmountPaidForPeriod += Number(normalizedBooking.amountPaid);
      totalBookingsForPeriod += normalizedBooking.totalMassesBooked;
    });

    return successResponse(res, 200, {
      totalAmountPaid: statData.totalAmountPaid || 0,
      totalAmountPaidForPeriod,
      totalBookingsForPeriod,
      bookings,
    });
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};
