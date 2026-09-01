import { Router } from "express";
import {
  createSubscription,
  getUserSubscriptions,
  getDetailsSubscription,
  deleteSubscription,
  updateSubscription,
  cancelSubscription,
  getUpcomingRenewals,
} from "../controllers/subscriptionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const subscriptionRouter = Router();

subscriptionRouter.use(authMiddleware);

subscriptionRouter.get("/upcoming-renewals", getUpcomingRenewals);

subscriptionRouter.get("/:id", getDetailsSubscription);

subscriptionRouter.post("/", createSubscription);

subscriptionRouter.put("/:id", updateSubscription);

subscriptionRouter.get("/user/:id", getUserSubscriptions);

subscriptionRouter.delete("/:id", deleteSubscription);

subscriptionRouter.put("/delete/:id", cancelSubscription);

export default subscriptionRouter;
