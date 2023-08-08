import mongoose, { Schema, Document } from "mongoose";
import { User } from "../types/user";
import bcrypt from "bcrypt";

const userSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    /* confirmPassword: { type: String, required: true }, */
    dateOfBirth: { type: Date, required: true },
    isVerified: { type: Boolean, default: false },
    verificationCodeForgotPassword: { type: String },
    // registrationDate: Date,
    info: [String],
    image: [String],
    like: Number,
    wishlist: [String],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<User & Document>("User", userSchema);

export default UserModel;
