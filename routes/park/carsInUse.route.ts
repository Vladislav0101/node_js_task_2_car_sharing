import { Router } from "express";

import {
  getLowFuelLvl,
  getDriversWithoutCard,
  putTwiceBooked,
  startRun,
  endRun,
} from "../../controllers/park/carsInUse.controller";

const carsInUseRouter = Router();

carsInUseRouter.get("/low-fuel-level", getLowFuelLvl);

carsInUseRouter.get("/drivers-without-card", getDriversWithoutCard);

carsInUseRouter.put("/twice-booked", putTwiceBooked);

carsInUseRouter.put("/:vin/start-run/:userLicense", startRun);

carsInUseRouter.put("/:vin/end-run", endRun);

export default carsInUseRouter;
