import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import customError from "../utils/customError";
import { TokenType } from "../types";
import UserModel from "../models/User.model";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the token from the cookies
  const token = req.cookies.token;
  if (!token) {
    throw new customError(401, "Not Authorized. Please Login");
  }

  // Verify the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenType;
  const user = await UserModel.findById(decoded.userID).select(
    "-password -watchLater"
  );

  if (!user) {
    throw new customError(401, "Not Authorized. Please Login");
  }
  // Add the user object to the request
  req.user = user;
  next();
};

export default authMiddleware;
