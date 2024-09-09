import { IEventDoc } from "@src/interfaces/event.interface";
import Vendor from "@src/models/vendor.model";
import Event from "@src/models/event.model";
import { Types } from "mongoose";
import { IVendorDoc } from "@src/interfaces/vendor.interface";

export const findAllVendor = async (): Promise<IVendorDoc[] | []> => {
  return Vendor.find().populate({
    path: "vendorTags",
    model: Event,
  });
};
