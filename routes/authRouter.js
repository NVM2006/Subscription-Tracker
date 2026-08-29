import { Router } from "express";

const authRouter = Router();

authRouter.post("/register", (req, res) => {
  res.send({ message: "Register" });
});
authRouter.post("/login", (req, res) => {
  res.send({ message: "Login" });
});
authRouter.post("/logout", (req, res) => {
  res.send({ message: "Logout" });
});

export default authRouter;
