import catchAsync from "@src/utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import * as userService from "@src/services/user.service";
import { generateToken } from "@src/plugins/jwt/jwt";
import responseStructure from "@src/utils/response-structure";
import httpStatus from "http-status-codes";

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const user = await userService.loginWithUsername(username, password);
    const accessToken = generateToken(user);
    res.status(httpStatus.OK).send(
      responseStructure(
        true,
        httpStatus.OK,
        `login user ${username} successfully`,
        {
          user,
          accessToken,
        }
      )
    );
  }
);

export const getUserInfo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res
      .status(httpStatus.OK)
      .send(
        responseStructure(
          true,
          httpStatus.OK,
          `success get user info`,
          req.user
        )
      );
  }
);
