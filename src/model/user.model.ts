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
