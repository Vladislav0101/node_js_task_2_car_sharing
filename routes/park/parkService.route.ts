import { Router } from "express";

const serviceRouter = Router();

serviceRouter.post("/add-new-car"); // http request to add new car in the car sharing park.

serviceRouter.put("/sent-to-service"); // http request to update any car produced before '01/01/2017' or has mileage greater than 100000 km by setting Status to *In Service*.

serviceRouter.delete("/delete-car"); // http request to remove car by VIN

export default serviceRouter;
