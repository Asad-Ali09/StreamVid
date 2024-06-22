import { Request, Response } from "express";
import UserModel from "../models/User.model";
import customError from "../utils/customError";
import { watchLaterItemT } from "../types";

const getWatchLaterItems = async (req: Request, res: Response) => {
  const userId = req.user?._id as string;

  const user = await UserModel.findById(userId).select("watchLater");

  if (!user) {
    throw new customError(400, "Please Login to view your watch later list");
  }

  res.status(200).json(user.watchLater);
};

const addWatchLater = async (
  req: Request<{}, {}, watchLaterItemT>,
  res: Response
) => {
  const userId = req.user?._id as string;
  const { mediaType, mediaID } = req.body;

  // Find user by ID
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new customError(404, "Please Login");
  }

  const exists = user.watchLater.some(
    (item) => item.mediaType === mediaType && item.mediaID === mediaID
  );

  if (exists) {
    throw new customError(400, "Item already exists in watch later list");
  }

  user.watchLater.push({ mediaType, mediaID });
  await user.save();

  res.status(200).json({
    message: "Watch later item added successfully",
    watchLater: user.watchLater,
  });
};

const removeWatchLater = async (
  req: Request<{}, {}, watchLaterItemT>,
  res: Response
) => {
  const userId = req.user?._id as string;
  const { mediaID, mediaType } = req.body;

  // Find user by ID
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new customError(404, "Please Login");
  }

  // Remove watch later item by mediaID
  user.watchLater = user.watchLater.filter(
    (item) => item.mediaID !== mediaID || item.mediaType !== mediaType
  );
  await user.save();

  res.status(200).json({
    message: "Watch later item removed successfully",
    watchLater: user.watchLater,
  });
};

export { getWatchLaterItems, addWatchLater, removeWatchLater };
