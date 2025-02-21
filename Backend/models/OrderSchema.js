import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["esewa", "khalti", "cash"], 
      required: true,
    },
    transactionId: {
      type: String,
    },
    pickupType: {
      type: String,
      enum: ["self", "delivery"], 
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
