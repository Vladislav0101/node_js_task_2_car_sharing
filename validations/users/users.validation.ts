import { Joi } from "express-validation";

export const creditCardValidation = Joi.object({
  number: Joi.number(),
  owner: Joi.string(),
  validThrough: Joi.string(),
});

export const userValidation = Joi.object({
  licenseNumber: Joi.number().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  creditCard: creditCardValidation,
});
