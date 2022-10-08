import express from "express";
import { validateMassBooking } from "../middlewares";
import { getMassBookings, createMassBooking } from "../controllers";

const router = express.Router();

router.post("/bookings", validateMassBooking, createMassBooking);

router.get("/bookings", getMassBookings);

export default router;