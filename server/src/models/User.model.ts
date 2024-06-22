import mongoose, { Schema } from "mongoose";
import { IUser, TokenType } from "../types";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [30, "Name must not be more than 30 characters long"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    trim: true,
    unique: true,
    lowercase: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    minlength: [6, "Password must be at least 6 characters"],
  },
  profilePicture: String,
});

UserSchema.pre("save", async function (next) {
  if (!this.password || !this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
  next();
});

UserSchema.methods.createJWT = function () {
  const payload: TokenType = {
    userID: this._id,
    email: this.email,
  };
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRY! || "3d",
  });
};

UserSchema.methods.toResponseObject = function () {
  const user = this.toObject() as IUser;

  const filteredUser = Object.keys(user)
    .filter((k) => k !== "password")
    .reduce((acc: Record<string, any>, key: string) => {
      acc[key] = user[key as keyof typeof user];
      return acc;
    }, {});

  return filteredUser;
};

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
