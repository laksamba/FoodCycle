import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
    },
    expireTime: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    isdonation: {
      type: Boolean,
      default: false,
    },
    pickupWindow: {
      type: {
        start: { type: Date, required: true },
        end: { type: Date, required: true },
      },
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "reserve", "expired"], 
      default: "available",
    },
    dietaryTags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", FoodSchema);

export default Food;
