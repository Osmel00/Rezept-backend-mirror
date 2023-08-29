import { User } from "../types/user";
import UserModel from "./user.schema";

//! SIGNUP
export async function createUser(
  username: string,
  email: string,
  password: string,
  dateOfBirth: Date
): Promise<User> {
  const user = await new UserModel({
    username,
    email,
    password,
    dateOfBirth,
  });
  return user.save();
}

//! email verification
export async function verifyEmailModel(email: string): Promise<boolean> {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  user.isVerified = true;
  await user.save();

  return true;
}

//! login
export async function loginModel(
  email: string,
  password: string
): Promise<User | null> {
  const user = await UserModel.findOne({ email });
  return user || null;
}

//! getUserbyId
export const getSingleUser = async (id: string) => {
  try {
    const user = await UserModel.findById(id);

    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};
