import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Price must be greater than or equal to 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "VND", "EUR"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: [true, "Subscription frequency is required"], // Bắt buộc phải có dòng này
    },
    category: {
      type: String,
      enum: [
        "sport",
        "news",
        "entertainment",
        "lifestyle",
        "technology",
        "finance",
        "politics",
        "other",
      ],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

subscriptionSchema.pre("save", function () {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    const daysToAdd = renewalPeriods[this.frequency];
    if (daysToAdd) {
      this.renewalDate = new Date(this.startDate);
      this.renewalDate.setDate(this.renewalDate.getDate() + daysToAdd);
    }
  }
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
