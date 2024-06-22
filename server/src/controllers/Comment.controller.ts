import { Request, Response } from "express";
import UserModel from "../models/User.model";
import customError from "../utils/customError";
import { CommentModel, CommentShowModel } from "../models/Comment.model";
import { IComment, ICommentShow } from "../types";

interface commentRequest {
  comment: string;
  mediaType: string;
  mediaID: number;
  episode?: number;
  season?: number;
}

const addComent = async (
  req: Request<{}, {}, commentRequest>,
  res: Response
) => {
  const { comment, mediaID, mediaType, episode, season } = req.body;

  const userID = req.user?._id as string;

  if (!comment || comment === "") {
    throw new customError(400, "Please provide a comment");
  }

  if (mediaType !== "tv" && mediaType !== "movie") {
    throw new customError(400, "Please provide a valid media type");
  }

  if (mediaType === "tv" && (!episode || !season)) {
    throw new customError(400, "Please provide episode and season number");
  }

  let commentItem: IComment | ICommentShow;
  if (mediaType === "movie")
    commentItem = await CommentModel.create({
      user: userID,
      comment,
      mediaID,
      mediaType,
    });
  else
    commentItem = await CommentShowModel.create({
      user: userID,
      comment,
      mediaID,
      mediaType,
      episode,
      season,
    });

  return res.status(201).json(commentItem);
};

const removeComment = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const userId = req.user?._id as string;

  await CommentModel.findOneAndDelete({ _id: id, user: userId });

  res.status(200).json({ message: "Comment deleted successfully" });
};

const getAllComments = async (
  req: Request<{}, {}, Omit<commentRequest, "comment">>,
  res: Response
) => {
  const { mediaType, mediaID, season, episode } = req.body;
  if (!mediaID || !mediaType) {
    throw new customError(400, "Please provide mediaID and mediaType");
  }

  if (mediaType !== "tv" && mediaType !== "movie") {
    throw new customError(400, "Please provide a valid mediaType");
  }

  if (
    mediaType === "tv" &&
    (!episode || !season || episode <= 0 || season <= 0)
  ) {
    throw new customError(
      400,
      "Please provide valid episode and season number"
    );
  }

  let comments: IComment[] | ICommentShow[];

  comments = await CommentModel.find({
    mediaID,
    mediaType,
    season,
    episode,
  })
    .sort({ createdAt: -1 })
    .populate("user", "name profilePicture");

  res.status(200).json(comments);
};

export { addComent, removeComment, getAllComments };
