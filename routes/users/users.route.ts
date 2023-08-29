import { Router } from "express";

import specialUserRouter from "./specialUser.route";
import {
  createUser,
  getAllUsers,
} from "../../controllers/users/users.controllers";

const usersRouter = Router();

usersRouter.get("/all", getAllUsers);

usersRouter.post("/create-user", createUser);

usersRouter.use("/:userId", specialUserRouter);

export default usersRouter;
