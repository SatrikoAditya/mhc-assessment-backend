import { IWellnessEvent } from "@src/interfaces/wellness-event.interface";
import Joi from "joi";

export const createWellnessEventBody: Record<
  keyof Partial<IWellnessEvent>,
  any
> = {
  company: Joi.string().required(),
  vendor: Joi.string().required(),
  proposedDates: Joi.array<Date>().length(3),
  proposedLocation: Joi.object().keys({
    postalCode: Joi.string().required(),
    streetName: Joi.string().optional().allow(""),
  }),
  event: Joi.string().required(),
  status: Joi.string().required(),
  remarks: Joi.string().optional(),
  confirmedDateByVendor: Joi.date().optional(),
};

export const createWellnessEvent = {
  body: Joi.object().keys(createWellnessEventBody),
};

export const approvalWellnessEvent = {
  body: Joi.object().keys({
    status: Joi.string().required(),
    confirmedDate: Joi.date().allow(null),
    remarks: Joi.string().optional().allow(""),
  }),
};
