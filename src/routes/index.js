import express from "express";
import {
  validateMassBooking,
  validateUserSignup,
  validateUserSignIn,
  compareUserPassword,
  checkUserEmail,
  validateSendResetEmail,
  validateUpdateUser,
  validateCreateUser,
} from "../middlewares";
import { getMassBookings, createMassBooking } from "../controllers/bookings";
import {
  adminSignup,
  signIn,
  sendPasswordResetEmail,
  resetUserPassword,
  createNewUser,
  updateUserData,
} from "../controllers/user";

const router = express.Router();

router.post("/bookings", validateMassBooking, createMassBooking);

router.get("/bookings", getMassBookings);

router.post("/admin/signup", validateUserSignup, adminSignup);

router.post("/admin/createUser", validateCreateUser, createNewUser);

router.patch("/admin/updateUser/:id", validateUpdateUser, updateUserData);

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
