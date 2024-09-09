import catchAsync from "@src/utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import * as vendorService from "@src/services/vendor.service";
import { generateToken } from "@src/plugins/jwt/jwt";
import responseStructure from "@src/utils/response-structure";
import httpStatus from "http-status-codes";

export const getVendors = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const vendors = await vendorService.findAllVendor();
    res
      .status(httpStatus.OK)
      .send(
        responseStructure(
          true,
          httpStatus.OK,
          "success get all vendors",
          vendors
        )
      );
  }
);
