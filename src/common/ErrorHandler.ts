import {ApiError} from "./ApiError";
import {NextFunction, Request, Response} from "express";
import {HttpCode} from "./HttpCode";

export class ErrorHandler {
  public static handleError(err:string|Error|ApiError, req:Request, res: Response, next:NextFunction) {
    let errorMessage:string;
    let errorHttpCode:HttpCode = HttpCode.INTERNAL_SERVER_ERROR;

    if (err instanceof ApiError) {
      errorMessage = err.errorData.message;
      errorHttpCode = err.errorData.httpCode;
    } else if (err instanceof Error) {
      errorMessage = err.message;
    } else {
      errorMessage = err;
    }

    res.status(errorHttpCode).json({errorMessage});
    res.send("errorMessage");
  }
}
