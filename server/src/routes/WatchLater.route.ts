import { Router } from "express";
import {
  addWatchLater,
  removeWatchLater,
  getWatchLaterItems,
} from "../controllers/WatchLater.controller";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware);

router
  .route("/")
  .get(getWatchLaterItems)
  .post(addWatchLater)
  .delete(removeWatchLater);

export default router;
