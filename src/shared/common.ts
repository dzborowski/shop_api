import * as Joi from 'joi'

export const paramSchema = Joi.object().keys({
  id: Joi.number()
    .min(0)
    .required()
})

export const querySchema = Joi.object().keys({
  search: Joi.string(),
  limit: Joi.number()
    .min(5)
    .max(50),
  offset: Joi.number().min(0)
})
