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
    password: { type: String, required: true, select:false },
    role: {
      type: String,
      enum: ["business", "consumer", "ngos", "admin"],
      default: "consumer",
      required: true,
    },
    location: {
      type: { 
        type: String,     
        enum: ['Point'],   
        required: true 
      },
      coordinates: {
        type: [Number],   
      }
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
// Create a 2dsphere index for geospatial queries on the location field
UserSchema.index({ location: "2dsphere" });

const User = mongoose.model("User", UserSchema);

export default User;
