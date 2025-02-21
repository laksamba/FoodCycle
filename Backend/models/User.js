import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      enum: ["business", "consumer", "ngos" , "admin"], 
      default: "consumer",
      required: true,
    },
    location: {
      type: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
      required: true,
      index: '2dsphere',
    },
    phone: {
      type: Number,
    },
    businessDetails: {
      licenseNumber: String,
      address: String,
      verified: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
