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

export type watchLaterItemT = {
  mediaType: "tv" | "movie";
  mediaID: number;
};
