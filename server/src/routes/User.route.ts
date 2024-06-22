import { Router } from "express";

import {
  signUp,
  login,
  isLoggedIn,
  logout,
  getUserProfile,
  updateUserProfile,
  removeProfile,
  changePassword,
} from "../controllers/User.controller";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.route("/signup").post(signUp);
router.route("/").post(login).get(logout);
router.route("/is-logged-in").get(isLoggedIn);

router.use("/profile", authMiddleware);

router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.route("/profile/remove-photo").put(removeProfile);
router.route("/profile/change-password").put(changePassword);

export default router;
