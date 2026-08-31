import { Router } from "express";
import { getUser, getUsers } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.get("/", authMiddleware, getUsers);

userRouter.get("/:id", authMiddleware, getUser);

userRouter.post("/", (req, res) => {
  res.send({ title: "Create user" });
});

userRouter.put("/:id", (req, res) => {
  res.send({ title: "Update user " });
});

userRouter.delete("/:id", (req, res) => {
  res.send({ title: "Delete user" });
});

export default userRouter;
