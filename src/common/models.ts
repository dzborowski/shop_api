import * as Joi from "joi";

export interface IRouterConfig {
  prefix: string
  createObj: Joi.ObjectSchema
  updateObj: Joi.ObjectSchema
}
