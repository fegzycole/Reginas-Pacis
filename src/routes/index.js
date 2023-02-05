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
import {
  getMassBookings,
  createMassBooking,
  getFiveLatestBookings,
} from "../controllers/bookings";
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

router.post("/admin/signup", validateUserSignup, adminSignup);

router.post(
  "/admin/createUser",
  validateCreateUser,
  authorizeUser,
  checkIsAdmin,
  createNewUser
);

router.post(
  "/admin/signin",
  validateUserSignIn,
  checkUser,
  compareUserPassword,
  signIn
);

router.get("/admin/bookings", authorizeUser, getMassBookings);

router.get("/admin/bookings/latest", getFiveLatestBookings);

router.get("/admin/:id/user", authorizeUser, checkUserId, getUser);

router.patch(
  "/admin/updateUser/:id",
  validateUpdateUser,
  authorizeUser,
  updateUserData
);

export default router;
