import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    let token;
    const authorCode = req.headers.authorization;
    if (authorCode && authorCode.startsWith("Bearer")) {
      token = authorCode.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
