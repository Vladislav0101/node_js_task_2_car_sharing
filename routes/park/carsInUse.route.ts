import { Router } from "express";

import {
  getLowFuelLvl,
  getDriversWithoutCard,
  putTwiceBooked,
  startRun,
  endRun,
} from "../../controllers/park/carsInUse.controller";

const carsInUseRouter = Router();

// http request to obtain list of cars that are currently in use and fuel level
// less than 1/4 of full tank
carsInUseRouter.get("/low-fuel-level", getLowFuelLvl);

// http request to obtain all cars that has been reserved, but driver credit/debit card hasn't been
// authorized. Return VIN, location, driver first/last name and driver license number.
carsInUseRouter.get("/drivers-without-card", getDriversWithoutCard);

// http request to update any car that has been booked more than 2 times and aren't
//*In use* or *Reserved* by setting location coordinates to { latitude: 53.8882836, longitude: 27.5442615}
carsInUseRouter.put("/twice-booked", putTwiceBooked);

carsInUseRouter.put("/:vin/start-run/:userLicense", startRun);

carsInUseRouter.put("/:vin/end-run", endRun);

export default carsInUseRouter;
