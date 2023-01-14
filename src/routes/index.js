import express from "express";
import {
  validateMassBooking,
  validateUserSignup,
  validateUserSignIn,
  compareUserPassword,
  checkUserEmail,
} from "../middlewares";
import { getMassBookings, createMassBooking } from "../controllers/bookings";
import { signupUser, signIn } from "../controllers/user";

const router = express.Router();

router.post("/bookings", validateMassBooking, createMassBooking);
router.get("/bookings", getMassBookings);
router.post("/users/signup", validateUserSignup, signupUser);
router.post(
  "/users/signin",
  validateUserSignIn,
  checkUserEmail,
  compareUserPassword,
  signIn
);

export default router;
