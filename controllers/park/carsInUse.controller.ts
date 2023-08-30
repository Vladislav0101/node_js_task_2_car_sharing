import { Request, Response } from "express";

import { Car } from "../../models/park";
import { CarModel } from "../../models/DBModels/park.models";
import { UserModel } from "../../models/DBModels/users.models";

import { CAR_STATUSES } from "../../constants/park";
import driversWithoutCardMapper from "../../mappers/DriversWithoutCard";

const getLowFuelLvl = async (req: Request, res: Response) => {
  const data = await CarModel.find({
    status: CAR_STATUSES.inUse,
    fuelLevel: { $lte: 0.25 },
  });

  res.status(200).send(data);
};

const getDriversWithoutCard = async (req: Request, res: Response) => {
  const cars = await CarModel.find({
    $or: [
      {
        currentRun: { $exists: true },
        "currentRun.driver.creditCard": { $exists: false },
      },
      {
        bookingHistory: {
          $elemMatch: {
            "driver.creditCard": { $exists: false },
          },
        },
      },
    ],
  });

  const responseData = driversWithoutCardMapper(cars);
  res.status(200).send(responseData);
};

const putTwiceBooked = async (req: Request, res: Response) => {
  const data = await CarModel.updateMany(
    {
      "bookingHistory.2": { $exists: true },
      $or: [{ status: CAR_STATUSES.inUse }, { status: CAR_STATUSES.reserved }],
    },
    {
      location: "JOPA",
    }
  );

  res.status(200).send(data);
};

const startRun = async (req: Request, res: Response) => {
  const userLicense = req.params["userLicense"];
  const vin = req.params["vin"];

  const user = await UserModel.findOne({ licenseNumber: userLicense });
  const car = await CarModel.findOne({ vin });

  if (!car || !user) return res.status(400);
  if (car.currentRun) return res.status(200).send("Car was already booked");

  car.status = CAR_STATUSES.reserved;
  car.currentRun = {
    driver: user,
    startDate: new Date(),
    startFuelLevel: car?.fuelLevel,
    startMilage: car?.mileage,
  };

  const busyCar = await car.save();
  res.status(200).send(busyCar);
};

const endRun = async (req: Request, res: Response) => {
  const vin = req.params["vin"];
  const bookedCar = await CarModel.findOne({ vin });

  if (!bookedCar) return res.status(400);
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
    endDate: new Date(),
    endFuelLevel: bookedCar.fuelLevel,
    endMilage: bookedCar.mileage,
  };

  bookedCar.bookingHistory.push(runInfo);
  bookedCar.status = CAR_STATUSES.inUse;
  bookedCar.currentRun = undefined;

  // refill simulation
  if (bookedCar.fuelLevel <= 0) bookedCar.fuelLevel = 1;

  const unbookedCar = await bookedCar.save();
  res.status(200).send(unbookedCar);
};

export {
  getLowFuelLvl,
  getDriversWithoutCard,
  putTwiceBooked,
  startRun,
  endRun,
};
