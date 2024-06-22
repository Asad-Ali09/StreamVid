import mongoose, { Schema } from "mongoose";
import { IComment, ICommentShow } from "../types";

const CommentSchema = new Schema<IComment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      required: true,
      enum: ["tv", "movie"],
    },
    mediaID: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommentShowSchema = new Schema<ICommentShow>({
  season: {
    type: Number,
    required: true,
    min: 1,
  },
  episode: {
    type: Number,
    required: true,
    min: 1,
  },
});

const CommentModel = mongoose.model<IComment>("Comment", CommentSchema);
const CommentShowModel = CommentModel.discriminator<ICommentShow>(
  "CommentShow",
  CommentShowSchema
);

export { CommentModel, CommentShowModel };
