import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send({ title: "Get all subcription" });
});

subscriptionRouter.get("/:id", (req, res) => {
  res.send({ title: "Get detail subcription" });
});

subscriptionRouter.post("/", (req, res) => {
  res.send({ title: "Post subcription" });
});

subscriptionRouter.put("/:id", (req, res) => {
  res.send({ title: "Update subcription" });
});

subscriptionRouter.get("/user/:id", (req, res) => {
  res.send({ title: "Get all user subcription" });
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send({ title: "Delete subcription" });
});

subscriptionRouter.put("/delete/:id", (req, res) => {
  res.send({ title: "Cancel subcription" });
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ title: "Get upcoming renewals" });
});

export default subscriptionRouter;
