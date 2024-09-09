import catchAsync from "@src/utils/catchAsync";
import { Response, NextFunction } from "express";
import * as wellnessEventService from "@src/services/wellness-event.service";
import responseStructure from "@src/utils/response-structure";
import httpStatus from "http-status-codes";
import { IWellnessEvent } from "@src/interfaces/wellness-event.interface";

export const createWellnessEvent = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const userType = req.user.userType;
    const bodyParams: IWellnessEvent = req.body;

    if (userType == "Vendor") throw { name: "FORBIDDEN_ACCESS" };
    const wellnessEvent = await wellnessEventService.insertWellnessEvent(
      bodyParams
    );
    res
      .status(httpStatus.CREATED)
      .send(
        responseStructure(
          true,
          httpStatus.CREATED,
          "success create wellness event",
          wellnessEvent
        )
      );
  }
);

export const getWellnessEvents = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const userType = req.user.userType;
    let query: any;

    if (userType == "Vendor") query = { vendor: req.user.vendor._id };
    if (userType == "HR") query = { company: req.user.company._id };
    const wellnessEvents = await wellnessEventService.findAllWellnessEvent(
      query
    );

    res
      .status(httpStatus.OK)
      .send(
        responseStructure(
          true,
          httpStatus.OK,
          "succes get all wellness events",
          wellnessEvents
        )
      );
  }
);

export const changeStatusWellnessEvent = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const userType = req.user.userType;
    const { status, remarks, confirmedDate } = req.body;
    const { id } = req.params;

    if (userType == "HR") throw { name: "FORBIDDEN_ACCESS" };

    const wellnessEvent = await wellnessEventService.changeStatusWellnessEvent(
      id,
      status,
      confirmedDate,
      remarks
    );
    res
      .status(httpStatus.OK)
      .send(
        responseStructure(
          true,
          httpStatus.OK,
          `success ${status} wellness event`,
          wellnessEvent
        )
      );
  }
);
