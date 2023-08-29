import { Request, Response } from "express";

import { UserModel } from "../../models/DBModels/users.models";
import { User } from "../../models/users";

import { userValidation } from "../../validations/users/users.validation";
import getErrorMessages from "../../utils/validations/getErrorMessagesFromValidation";

const getAllUsers = async (req: Request, res: Response) => {
  const allUsers = await UserModel.find();

  res.status(200).send(allUsers);
};

const createUser = async (req: Request, res: Response) => {
  const newUser: User = req.body;
  const validation = userValidation.validate(newUser);

  if (validation.error) {
    const errorsString = getErrorMessages(validation.error.details);
    console.error(errorsString);
    return res.status(400).send(errorsString);
  }

  const user = await UserModel.create(newUser);
  res.status(200).send(user);
};

export { createUser, getAllUsers };
