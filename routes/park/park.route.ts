import { Router } from "express";

import busyCarsRouter from "./busyCars.route";
import parkService from "./parkService.route";

const parkRouter = Router();

parkRouter.use("/busy-cars", busyCarsRouter);

parkRouter.use("/service", parkService);

