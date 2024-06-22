import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  readonly email: string;
  password: string;
  profilePicture?: string;
  watchLater: watchLaterItemT[];
  createJWT(): string;
  toResponseObject(): Omit<IUser, "password">;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export type TokenType = {
  userID: mongoose.Types.ObjectId;
  email: string;
};

type mediaTypeT = "tv" | "movie";

export type watchLaterItemT = {
  mediaType: mediaTypeT;
  mediaID: number;
};

export interface IComment extends Document {
  user: mongoose.Types.ObjectId;
  comment: string;
  mediaType: mediaTypeT;
  mediaID: number;
}

export interface ICommentShow extends IComment {
  episode: number;
  season: number;
}
