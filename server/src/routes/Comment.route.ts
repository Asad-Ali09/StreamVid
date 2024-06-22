import { Router } from "express";
import {
  addComent,
  removeComment,
  getAllComments,
} from "../controllers/Comment.controller";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.route("/").get(getAllComments).post(authMiddleware, addComent);

router.route("/:id").delete(authMiddleware, removeComment);

export default router;
