import { Request, Response } from "express";

import { CarModel } from "../../models/DBModels/park.models";
import { Car } from "../../models/park";

import { carValidation } from "../../validations/park/park.validation";
import getErrorMessages from "../../utils/validations/getErrorMessagesFromValidation";
import { CAR_STATUSES } from "../../constants/park";

const MILEAGE_TO_SERVICE = 100000;
const DATE_TO_SERVICE = "2017-01-01";

const getAllCars = async (req: Request, res: Response) => {
  const cars = await CarModel.find();

  res.status(200).send(cars);
};

const addNewCar = async (req: Request, res: Response) => {
  const newCar: Car = req.body;
  const validation = carValidation.validate(newCar);

  if (validation.error) {
    const errorsString = getErrorMessages(validation.error.details);
    console.error(errorsString);
    return res.status(400).send(errorsString);
  }

  const car: Car = await CarModel.create(newCar);
  res.status(200).send(car);
};

const sentUsedCarsToService = async (req: Request, res: Response) => {
  const data = await CarModel.updateMany(
    {
      mileage: { $gte: MILEAGE_TO_SERVICE },
      status: { $ne: CAR_STATUSES.inService },
      "productionInfo.date": {
        $lte: DATE_TO_SERVICE,
      },
    },
    {
      status: CAR_STATUSES.inService,
    }
  );

  res.status(200).send(data);
};

const deleteCar = async (req: Request, res: Response) => {
  const vin = req.params["vin"];
  const deletedCar = await CarModel.findOneAndDelete({ vin: vin });

  res.status(200).send(deletedCar);
};

export { getAllCars, addNewCar, sentUsedCarsToService, deleteCar };
