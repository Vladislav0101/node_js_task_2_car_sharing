import { Joi } from "express-validation";

import { userValidation } from "../users/users.validation";

export const carValidation = Joi.object({
  vin: Joi.number().required(),
  registrationNumber: Joi.number().required(),

  productionInfo: Joi.object({
    brand: Joi.string().required(),
    model: Joi.string().required(),
    date: Joi.date().required(),
    tankVolume: Joi.number().required(),
  }).required(),

  status: Joi.string().required(),
  fuelLevel: Joi.number().required(),
  mileage: Joi.number().required(),

  currentRun: Joi.object({
    driver: userValidation,
    startDate: Joi.date().required(),
    startFuelLevel: Joi.number().required(),
    startMilage: Joi.number().required(),
  }),

  location: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).required(),

  bookingHistory: Joi.array()
    .items(
      Joi.object({
        driver: userValidation,
        startDate: Joi.date().required(),
        startFuelLevel: Joi.number().required(),
        startMilage: Joi.number().required(),
        endDate: Joi.date().required(),
        endFuelLevel: Joi.number().required(),
        endMilage: Joi.number().required(),
      })
    )
    .required(),
});
