import { IUserDoc } from "@src/interfaces/user.interface";
import User from "@src/models/user.model";
import { Types } from "mongoose";
import Company from "@src/models/company.model";
import Vendor from "@src/models/vendor.model";

export const getUserByUsername = async (
  username: string
): Promise<IUserDoc | null> => User.findOne({ username });

export const getUserById = async (
  id: Types.ObjectId
): Promise<IUserDoc | null> =>
  User.findById(id)
    .populate({
      path: "company",
      model: Company,
    })
    .populate({
      path: "vendor",
      model: Vendor,
    });

export const loginWithUsername = async (
  username: string,
  password: string
): Promise<IUserDoc> => {
  const user = await getUserByUsername(username);

  if (!user || !(await user.isPasswordMatch(password))) {
    throw { name: "AUTHENTICATION_FAILED" };
  }

  return user;
};
