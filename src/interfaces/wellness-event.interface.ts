import { Document } from "mongoose";
import { ICompanyDoc } from "./company.interface";
import { IEventDoc } from "./event.interface";
import { IVendorDoc } from "./vendor.interface";

export interface IWellnessEvent {
  company: ICompanyDoc["_id"];
  vendor: IVendorDoc["_id"];
  event: IEventDoc["_id"];
  proposedDates: Date[];
  proposedLocation: {
    postalCode: string;
    streetName: string;
  };
  status: "Pending" | "Approved" | "Rejected";
  remarks?: string;
  confirmedDateByVendor?: Date;
}

export interface IWellnessEventDoc extends IWellnessEvent, Document {}
