import express from "express";
import { validateMassBooking } from "../middlewares/index.js";
import { getMassBookings, createMassBooking } from "../controllers/index.js";

const router = express.Router();

router.post("/bookings", validateMassBooking, createMassBooking);

router.get("/bookings", getMassBookings);

export default router;