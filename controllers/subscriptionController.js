import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscriptionModel.js";
import { SERVER_URL } from "../config/env.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const triggerResponse = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflow/subscription/reminder`,
      body: { subscriptionId: subscription.id },
      headers: { "content-type": "application/json" },
      retries: 0,
    });
    console.log("Upstash Trigger Response:", triggerResponse);

    res.status(201).json({
      success: true,
      data: subscription,
      workflow: triggerResponse.messageId || triggerResponse,
    });
  } catch (error) {
    next(error);
  }
};
export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("No permission to access this resource");
      error.statusCode = 403;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    if (!subscriptions) {
      const error = new Error("No subscriptions found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "All subscriptions fetched successfully",
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const getDetailsSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not exists");
      error.statusCode = 404;
      throw error;
    }

    if (req.user.id !== subscription.user.toString()) {
      const error = new Error("No permission to access this resource");
      error.statusCode = 403;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not exists");
      error.statusCode = 404;
      throw error;
    }

    if (req.user.id !== subscription.user.toString()) {
      const error = new Error("No permission to access this resource");
      error.statusCode = 403;
      throw error;
    }

    await Subscription.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not exists");
      error.statusCode = 404;
      throw error;
    }

    if (req.user.id !== subscription.user.toString()) {
      const error = new Error("No permission to access this resource");
      error.statusCode = 403;
      throw error;
    }

    const { name, price, currency, category, paymentMethod } = req.body;

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { name, price, currency, category, paymentMethod },
      { new: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      data: updatedSubscription,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not exists");
      error.statusCode = 404;
      throw error;
    }

    if (req.user.id !== subscription.user.toString()) {
      const error = new Error("No permission to access this resource");
      error.statusCode = 403;
      throw error;
    }
    const cancelledSubscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      data: cancelledSubscription,
    });
  } catch (error) {
    next(error);
  }
};

export const getUpcomingRenewals = async (req, res, next) => {
  try {
    const today = new Date();

    const upcomingDays = 7;
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + upcomingDays);

    const upcomingSubscriptions = await Subscription.find({
      user: req.user._id,
      status: "active",
      renewalDate: {
        $gte: today,
        $lte: futureDate,
      },
    });
    res.status(200).json({
      success: true,
      data: upcomingSubscriptions,
    });
  } catch (error) {
    next(error);
  }
};
