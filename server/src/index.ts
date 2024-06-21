import "express-async-errors";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorhandler from "./middlewares/errorHandler";
import notFound from "./middlewares/notFound";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL!,
    credentials: true,
  })
);

const port = process.env.PORT || 5500;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
});

// Erro handling
app.use(errorhandler);
app.use(notFound);

// Start Application
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
