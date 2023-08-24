import { Router } from "express";

import {
  getUserById,
  addCard,
  startRun,
  endRun,
} from "../../controllers/users/specialUser.controllers";

const user = Router({ mergeParams: true });

user.get("/", getUserById);

user.put("/add-card", addCard);

user.put("/start-run/:carId", startRun);

user.put("/end-run/:carId", endRun);

export default user;
