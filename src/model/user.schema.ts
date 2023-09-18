import mongoose, { Schema, Document } from "mongoose";
import { User } from "../types/user";

const userSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date },
    isVerified: { type: Boolean, default: false },
    verificationCodeForgotPassword: { type: String },
    info: [String],
    image: [String],
    like: Number,
    wishlist: [String],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const UserModel = mongoose.model<User & Document>("User", userSchema);

export default UserModel;
