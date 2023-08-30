import { Router } from "express";

import carsInUseRouter from "./carsInUse.route";
// import parkService from "./parkService.route";

import {
  getAllCars,
  deleteCar,
  addNewCar,
  sentUsedCarsToService,
} from "../../controllers/park/park.controllers";

const parkRouter = Router();

parkRouter.use("/cars-in-use", carsInUseRouter);

// parkRouter.use("/service", parkService);

parkRouter.get("/all-cars", getAllCars);

parkRouter.post("/add-new-car", addNewCar); // http request to add new car in the car sharing park.

parkRouter.put("/used-cars-to-service", sentUsedCarsToService); // http request to update any car produced before '01/01/2017' or has mileage greater than 100000 km by setting Status to *In Service*.

parkRouter.delete("/:vin/delete-car", deleteCar); // http request to remove car by VIN

export default parkRouter;
