import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import responseStructure from "@src/utils/response-structure";

export type errorType = {
  name: string;
  message: string;
};

export default (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errors = [];
  let errorStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  let errorName = error.name;
  let errorMessage = error.message ? error.message : error.name;

  switch (errorName) {
    case "VALIDATION_ERROR":
      errors.push(errorMessage);
      errorStatusCode = StatusCodes.BAD_REQUEST;
      break;
    case "AUTHENTICATION_FAILED":
      errors.push("Incorrect email or password");
      errorStatusCode = StatusCodes.UNAUTHORIZED;
      break;
    case "FORBIDDEN_ACCESS":
      errors.push("access not allowed!");
      errorStatusCode = StatusCodes.FORBIDDEN;
      break;
    case "DATA_NOT_FOUND":
      errors.push("Data not found!");
      errorStatusCode = StatusCodes.NOT_FOUND;
      break;
    case "ValidationError":
      errors.push(errorMessage);
      errorStatusCode = StatusCodes.BAD_REQUEST;
      break;
    default:
      errors.push("Internal Server Error");
      console.log(error);
  }

  res
    .status(errorStatusCode)
    .json(
      responseStructure(false, errorStatusCode, "request return error", errors)
    );
};
