import { Router } from "express";

import uniqueUserRouter from "./uniqueUser.route";
import {
  createUser,
  getAllUsers,
} from "../../controllers/users/users.controllers";

const usersRouter = Router();

usersRouter.get("/all", getAllUsers);

usersRouter.post("/create-user", createUser);

usersRouter.use("/:userId", uniqueUserRouter);

export default usersRouter;
