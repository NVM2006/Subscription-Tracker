/* eslint-disable no-unused-vars */
import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongoDB.js";

import authRouter from "./routes/authRouter.js";
import subscriptionRouter from "./routes/subscriptionRouter.js";
import userRouter from "./routes/userRouter.js";

import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extends: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/subscription", subscriptionRouter);

app.use(errorMiddleware);

const server = app.listen(PORT, async () => {
  console.log(`Server runnning on port ${PORT}`);
  await connectToDatabase();
});

export default app;
