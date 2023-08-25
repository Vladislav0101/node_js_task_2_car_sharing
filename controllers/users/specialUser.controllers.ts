import { Request, Response } from "express";

import { UserModel } from "../../models/dataBaseModels/users.models";
import { CreditCard } from "../../models/users";
import { CarModel } from "../../models/dataBaseModels/park.models";

import { CAR_STATUSES } from "../../constants/park";
import { creditCardValidation } from "../../validations/users/users.validation";
import getErrorMessages from "../../utils/validations/getErrorMessagesFromValidation";

const getUserById = async (req: Request, res: Response) => {
  const id = req.params["id"];

  const user = await UserModel.findById(id);
  res.status(200).send(user);
};

const addCard = async (req: Request, res: Response) => {
  const id = req.params["id"];
  const creditCard: CreditCard = req.body;
  const userWithoutCard = await UserModel.findById(id);

  if (userWithoutCard?.creditCard?.number) {
    return res.send("Yor card was already activated");
  }

  const validation = creditCardValidation.validate(creditCard);
  if (validation.error) {
    const errorsString = getErrorMessages(validation.error.details);
    console.error(errorsString);
    return res.status(400).send(errorsString);
  }

  const userWithCard = await UserModel.findByIdAndUpdate(
    id,
    {
      creditCard,
    },
    { new: true }
  );
  res.status(200).send(userWithCard);
};

const startRun = async (req: Request, res: Response) => {
  const id = req.params["id"];
  const carId = req.params["carId"];

  const user = await UserModel.findById(id);
  const car = await CarModel.findById(carId);

  if (!car || !user) return res.status(400);
  if (car.currentRun) return res.status(200).send("Car was already booked");

  car.status = CAR_STATUSES.reserved;
  car.currentRun = {
    driver: user,
    startDate: new Date().toDateString(),
    startFuelLevel: car?.fuelLevel,
    startMilage: car?.mileage,
  };

  const busyCar = await car.save();
  res.status(200).send(busyCar);
};

const endRun = async (req: Request, res: Response) => {
  const id = req.params["id"];
  const carId = req.params["carId"];

  const user = await UserModel.findById(id);
  const bookedCar = await CarModel.findById(carId);

  if (!bookedCar || !user) return res.status(400);
  if (!bookedCar.currentRun)
    return res.status(200).send("Car is free for booking");

  // ride simulation
  bookedCar.mileage += 10;
  bookedCar.fuelLevel -= 0.05;

  const { driver, startDate, startFuelLevel, startMilage } =
    bookedCar.currentRun;
  const runInfo = {
    driver,
    startDate,
    startFuelLevel,
    startMilage,
    endDate: new Date().toDateString(),
    endFuelLevel: bookedCar.fuelLevel,
    endMilage: bookedCar.mileage,
  };

  bookedCar.bookingsHistory.push(runInfo);
  bookedCar.status = CAR_STATUSES.inUse;
  bookedCar.currentRun = undefined;

  // refill simulation
  if (bookedCar.fuelLevel <= 0) bookedCar.fuelLevel = 1;

  const unbookedCar = await bookedCar.save();
  res.status(200).send(unbookedCar);
};

export { getUserById, addCard, startRun, endRun };
