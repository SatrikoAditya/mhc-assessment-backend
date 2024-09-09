import mongoose, { Schema, Types } from "mongoose";
import { toJSON } from "@src/plugins/toJSON";
import { IVendorDoc } from "@src/interfaces/vendor.interface";

const vendorSchema = new Schema<IVendorDoc>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    vendorTags: [
      {
        type: Types.ObjectId,
        ref: "Event",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
vendorSchema.plugin(toJSON);

const Vendor = mongoose.model<IVendorDoc>("Vendor", vendorSchema);

export default Vendor;
