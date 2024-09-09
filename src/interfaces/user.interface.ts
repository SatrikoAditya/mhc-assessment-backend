import { Document } from "mongoose";
import { IVendorDoc } from "./vendor.interface";
import { ICompanyDoc } from "./company.interface";

export interface IUser {
  username: string;
  password: string;
  userType: "HR" | "Vendor";
  role: "admin";
  company?: ICompanyDoc["_id"];
  vendor?: IVendorDoc["_id"];
}

export interface IUserDoc extends IUser, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}
