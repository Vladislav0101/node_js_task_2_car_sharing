import { Router } from "express";

import {
  getUserById,
  addCard,
} from "../../controllers/users/specialUser.controllers";

const user = Router({ mergeParams: true });

user.get("/", getUserById);

user.put("/add-card", addCard);

export default user;
