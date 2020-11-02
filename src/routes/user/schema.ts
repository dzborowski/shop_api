import * as Joi from "joi";

export const createBody = Joi.object().keys({
  firstName: Joi.string()
      .alphanum()
      .min(2)
      .max(30)
      .required(),
  lastName: Joi.string()
      .alphanum()
      .min(2)
      .max(30)
      .required(),
  email: Joi.string()
      .email()
      .required(),
  password: Joi.string()
      .min(6)
      .required(),
});

export const updateBody = Joi.object().keys({
  firstName: Joi.string()
      .alphanum()
      .min(2)
      .max(30),
  lastName: Joi.string()
      .alphanum()
      .min(2)
      .max(30),
  email: Joi.string().email(),
  password: Joi.string().min(6),
});

export const loginBody = Joi.object().keys({
  email: Joi.string()
      .email()
      .required(),
  password: Joi.string()
      .min(6)
      .required(),
});
