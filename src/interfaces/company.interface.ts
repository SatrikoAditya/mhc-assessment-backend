import { Document, Types } from "mongoose";

export interface ICompany {
  name: string;
}

export interface ICompanyDoc extends ICompany, Document {}

export interface ICompanyWithId extends ICompany {
  _id: Types.ObjectId;
}
