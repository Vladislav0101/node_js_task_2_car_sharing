import { Router } from "express";

import carsInUseRouter from "./carsInUse.route";

import {
  getAllCars,
  deleteCar,
  addNewCar,
  sentUsedCarsToService,
} from "../../controllers/park/park.controllers";

const parkRouter = Router();

parkRouter.use("/cars-in-use", carsInUseRouter);

parkRouter.get("/all-cars", getAllCars);

parkRouter.post("/add-new-car", addNewCar);

parkRouter.put("/used-cars-to-service", sentUsedCarsToService);

parkRouter.delete("/:vin/delete-car", deleteCar);

export default parkRouter;
