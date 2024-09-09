import mongoose, { Schema } from "mongoose";
import { toJSON } from "@src/plugins/toJSON";
import { IEventDoc } from "@src/interfaces/event.interface";

const eventSchema = new Schema<IEventDoc>(
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
eventSchema.plugin(toJSON);

const Event = mongoose.model<IEventDoc>("Event", eventSchema);

export default Event;
