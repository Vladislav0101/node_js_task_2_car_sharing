import { Request, Response } from "express";

import { UserModel } from "../../models/dataBaseModels/users.models";
import { User, CreditCard } from "../../models/users";
import { Nullable } from "../../models/common";

import { creditCardValidation } from "../../validations/users/users.validation";
import getErrorMessages from "../../utils/validations/getErrorMessagesFromValidation";

const getUserById = async (req: Request, res: Response) => {
  const id = req.params["id"];

  const user = await UserModel.findById(id);
  res.status(200).send(user);
};

const addCard = async (req: Request, res: Response) => {
  const id = req.params["id"];
  const creditCard: CreditCard = req.body;
  const userWithoutCard: Nullable<User> = await UserModel.findById(id);

  if (userWithoutCard?.creditCard?.number) {
    return res.send("Yor card was already activated");
  }

  const validation = creditCardValidation.validate(creditCard);

  if (validation.error) {
    const errorsString = getErrorMessages(validation.error.details);
    console.error(errorsString);
    return res.status(400).send(errorsString);
  }

  const userWithCard: Nullable<User> = await UserModel.findByIdAndUpdate(
    id,
    {
      creditCard,
    },
    { new: true }
  );

  res.status(200).send(userWithCard);
};

const startRun = async (req: Request, res: Response) => {
  const id = req.params["id"];
  const carId = req.params["carId"];
  const user: Nullable<User> = await UserModel.findById(id);

  // set Driver for Car;
  // set Status and StartRun for Car

  res.status(200).send(user);
};

const endRun = async (req: Request, res: Response) => {
  const id = req.params["id"];
  const carId = req.params["carId"];
  const user: Nullable<User> = await UserModel.findById(id);

  // remove Driver from Car;
  // set Status; remove currentRun; add Run to Booking history

  res.status(200).send(user);
};

export { getUserById, addCard, startRun, endRun };
