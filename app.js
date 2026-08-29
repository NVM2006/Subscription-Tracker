/* eslint-disable no-unused-vars */
import express from "express";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongoDB.js";

import authRouter from "./routes/authRouter.js";
import subscriptionRouter from "./routes/subscriptionRouter.js";
import userRouter from "./routes/userRouter.js";
const app = express();

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/subscription", subscriptionRouter);

const server = app.listen(PORT, async () => {
  console.log(`Server runnning on port ${PORT}`);
  await connectToDatabase();
});

export default app;
