import { Request, Response } from "express";
import { IUser } from "../types";
import customError from "../utils/customError";
import UserModel from "../models/User.model";
import jwt from "jsonwebtoken";

const signUp = async (req: Request<{}, {}, IUser>, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new customError(400, "Invalid email or password");
  }

  // Check if the user already exists
  const user = await UserModel.findOne({ email });
  if (user) {
    throw new customError(400, "User already exists");
  }

  // Crete a new user
  const newUser = await UserModel.create({ name, email, password });

  if (!newUser) {
    throw new customError(400, "Invalid user data");
  }

  const token = newUser.createJWT();

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400 * 3), // 3 Days
    sameSite: "none",
    secure: true,
  });

  const responseUser = newUser.toResponseObject();

  res
    .status(201)
    .json({ message: "Accound created successfully", data: responseUser });
};

const login = async (
  req: Request<{}, {}, Omit<IUser, "name | profilePicture">>,
  res: Response
) => {
  const { email, password } = req.body;

  if (!password || !email) {
    throw new customError(400, "Invalid Credentials");
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new customError(404, "Invalid Credentials");
  }

  const isMatched = await user.comparePassword(password);

  if (!isMatched) {
    throw new customError(400, "Invalid Credentials");
  }

  const token = user.createJWT();
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400 * 3),
    sameSite: "none",
    secure: true,
  });

  const responseUser = user.toResponseObject();
  res
    .status(200)
    .json({ message: "Logged In Successfully", data: responseUser });
};

const logout = async (req: Request, res: Response) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    sameSite: "none",
    expires: new Date(0),
    secure: true,
  });

  res.status(200).json({ message: "Logged Out Successfully" });
};

const isLoggedIn = async (req: Request, res: Response) => {
  const { token } = req.cookies;

  if (!token || typeof token !== "string") {
    return res.status(200).json(false);
  }

  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET!);
  if (!decodedToken) {
    return res.status(200).json(false);
  }
  return res.status(200).json(true);
};

const getUserProfile = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  res.status(200).json(req.user);
};

const updateUserProfile = async (
  req: Request<{}, {}, { name?: string; profilePicture?: string }>,
  res: Response
) => {
  const { name, profilePicture } = req.body;

  const user: IUser = req.user;

  user.name = name ? name : user.name;
  user.profilePicture = profilePicture ? profilePicture : user.profilePicture;

  const updatedUser = await user.save();

  if (!updatedUser) {
    throw new customError(400, "Invalid user data");
  }

  res.status(200).json(updatedUser);
};

const removeProfile = async (req: Request, res: Response) => {
  const userId = req.user?._id as string;

  const user = await UserModel.findById(userId);
  if (!user) {
    throw new customError(404, "User not found");
  }
  user.profilePicture = "";
  await user.save();

  res.status(200).json({ message: "Profile Picture Removed" });
};

const changePassword = async (
  req: Request<{}, {}, { currentPassword: string; newPassword: string }>,
  res: Response
) => {
  const userId = req.user?._id as string;
  const { currentPassword, newPassword } = req.body;

  const user = await UserModel.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw new customError(400, "Incorrect Password");
  }

  if (newPassword.length < 6) {
    throw new customError(400, "Password must be at least 6 characters");
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({ message: "Password changed successfully" });
};

export {
  signUp,
  login,
  isLoggedIn,
  logout,
  getUserProfile,
  updateUserProfile,
  removeProfile,
  changePassword,
};
