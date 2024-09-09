import { Document, Types } from "mongoose";

export interface IVendor {
  name: string;
  vendorTags?: Types.ObjectId[];
}

export interface IVendorDoc extends IVendor, Document {}

export interface IVendorWithId extends IVendor {
  _id: Types.ObjectId;
}
