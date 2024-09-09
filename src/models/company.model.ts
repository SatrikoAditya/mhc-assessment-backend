import mongoose, { Schema } from "mongoose";
import { toJSON } from "@src/plugins/toJSON";
import { ICompanyDoc } from "@src/interfaces/company.interface";

const companySchema = new Schema<ICompanyDoc>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
companySchema.plugin(toJSON);

const Company = mongoose.model<ICompanyDoc>("Company", companySchema);

export default Company;
