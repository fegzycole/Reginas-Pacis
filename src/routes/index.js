import express from "express";
import {
  validateMassBooking,
  validateUserSignup,
  validateUserSignIn,
  compareUserPassword,
  checkUser,
  validateSendResetEmail,
  validateUpdateUser,
  validateCreateUser,
  authorizeUser,
  checkIsAdmin,
  checkUserId,
} from "../middlewares";
import { getMassBookings, createMassBooking } from "../controllers/bookings";
import {
  adminSignup,
  signIn,
  sendPasswordResetEmail,
  resetUserPassword,
  createNewUser,
  updateUserData,
  getUser,
} from "../controllers/user";

const router = express.Router();

router.post("/bookings", validateMassBooking, createMassBooking);

router.get("/admin/bookings", authorizeUser, getMassBookings);

// Endpoint only to be used to create the root admin
router.post("/admin/signup", validateUserSignup, adminSignup);

router.post(
  "/admin/createUser",
  validateCreateUser,
  authorizeUser,
  checkIsAdmin,
  createNewUser
);

router.patch(
  "/admin/updateUser/:id",
  validateUpdateUser,
  authorizeUser,
  updateUserData
);

router.post(
  "/admin/signin",
  validateUserSignIn,
  checkUser,
  compareUserPassword,
  signIn
);

router.get(
  "/users/sendPasswordResetEmail/:email",
  validateSendResetEmail,
  checkUser,
  sendPasswordResetEmail
);

router.patch(
  "/users/resetPassword/:email",
  validateSendResetEmail,
  checkUser,
  resetUserPassword
);

router.get("/admin/:id", authorizeUser, checkUserId, getUser);

export default router;
