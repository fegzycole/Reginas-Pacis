import express from "express";
import {
  validateMassBooking,
  validateUserSignup,
  validateUserSignIn,
  compareUserPassword,
  checkUserEmail,
  validateSendResetEmail,
} from "../middlewares";
import { getMassBookings, createMassBooking } from "../controllers/bookings";
import {
  signupUser,
  signIn,
  sendPasswordResetEmail,
  resetUserPassword,
} from "../controllers/user";

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

router.get(
  "/users/sendPasswordResetEmail/:email",
  validateSendResetEmail,
  checkUserEmail,
  sendPasswordResetEmail
);

router.patch(
  "/users/resetPassword/:email",
  validateSendResetEmail,
  checkUserEmail,
  resetUserPassword
);

export default router;
