import { Router } from "express";

const busyCarsRouter = Router();

busyCarsRouter.get("/low-fuel-level"); // http request to obtain list of cars that are currently in use and fuel level less than 1/4 of full tank

busyCarsRouter.get("/drivers-without-card"); // http request to obtain all cars that has been reserved, but driver credit/debit card hasn't been authorized. Return VIN, location, driver first/last name and driver license number.

busyCarsRouter.put("/twice-booked"); // http request to update any car that has been booked more than 2 times and aren't *In use* or *Reserved* by setting location coordinates to { latitude: 53.8882836, longitude: 27.5442615}

export default busyCarsRouter;
