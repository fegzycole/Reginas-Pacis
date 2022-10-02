import { errResponse, successResponse } from "../helpers/index.js";

/**
 * Gets all mass bookings in the DB
 * @param {*} req request object
 * @param {*} res response object
 */
export const getMassBookings = async (_req, res) => {
  try {
    const massBookings =
      (await db
        .collection("bookings")
        .find()
        .sort({ dateTime: -1 })
        .toArray()) || [];

    successResponse(res, 200, massBookings);
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
    const collection = db.collection("bookings");
    const { insertedId } = await collection.insertOne(req.body);
    const createdExchange = await collection
      .find({ _id: insertedId })
      .toArray();

    successResponse(res, 201, createdExchange[0]);
  } catch (error) {
    errResponse(res, 500, error.message);
  }
};
