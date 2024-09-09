import {
  IWellnessEventDoc,
  IWellnessEvent,
} from "@src/interfaces/wellness-event.interface";
import WellnessEvent from "@src/models/wellness-event.model";
import { Types } from "mongoose";
import Company from "@src/models/company.model";
import Event from "@src/models/event.model";
import Vendor from "@src/models/vendor.model";

export const insertWellnessEvent = async (
  data: IWellnessEvent
): Promise<IWellnessEventDoc> => {
  return WellnessEvent.create(data);
};

export const findAllWellnessEvent = async (
  query: any
): Promise<IWellnessEventDoc[]> => {
  return WellnessEvent.find(query)
    .populate({
      path: "company",
      model: Company,
    })
    .populate({
      path: "vendor",
      model: Vendor,
    })
    .populate({
      path: "event",
      model: Event,
    })
    .sort({
      createdAt: -1,
    });
};

export const findWellnessEventById = async (
  id: Types.ObjectId
): Promise<IWellnessEventDoc | null> => WellnessEvent.findById(id);

export const changeStatusWellnessEvent = async (
  id: Types.ObjectId,
  status: "Pending" | "Approved",
  confirmedDate: Date,
  remarks?: string
): Promise<IWellnessEventDoc | null> => {
  const wellnessEvent = await findWellnessEventById(id);
  if (!wellnessEvent) throw { name: "DATA_NOT_FOUND" };
  await wellnessEvent.updateOne({
    status,
    remarks,
    confirmedDateByVendor: confirmedDate,
  });
  return wellnessEvent;
};
