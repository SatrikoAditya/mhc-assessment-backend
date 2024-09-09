import mongoose, { Schema, Types } from "mongoose";
import { toJSON } from "@src/plugins/toJSON";
import { IWellnessEventDoc } from "@src/interfaces/wellness-event.interface";

const wellnessEventSchema = new Schema<IWellnessEventDoc>(
  {
    company: {
      type: Types.ObjectId,
      required: true,
      ref: "Company",
    },
    vendor: {
      type: Types.ObjectId,
      required: true,
      ref: "Vendor",
    },
    proposedDates: {
      type: [Date],
      required: true,
      validate(value: Date[]) {
        if (value.length !== 3) {
          throw new Error("Exactly 3 proposed dates are required.");
        }
      },
    },
    proposedLocation: {
      postalCode: {
        type: String,
        required: true,
      },
      streetName: {
        type: String,
        required: false,
      },
    },
    event: {
      type: Types.ObjectId,
      required: true,
      ref: "Event",
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    remarks: {
      type: String,
      required: false,
    },
    confirmedDateByVendor: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
wellnessEventSchema.plugin(toJSON);

const WellnessEvent = mongoose.model<IWellnessEventDoc>(
  "WellnessEvent",
  wellnessEventSchema
);

export default WellnessEvent;
