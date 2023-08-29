import { Request, Response } from "express";

import { UserModel } from "../../models/dataBaseModels/users.models";
import { CreditCard } from "../../models/users";

import { creditCardValidation } from "../../validations/users/users.validation";
import getErrorMessages from "../../utils/validations/getErrorMessagesFromValidation";

const getUserById = async (req: Request, res: Response) => {
  const userId = req.params["userId"];

  const user = await UserModel.findById(userId);
  res.status(200).send(user);
};

const addCard = async (req: Request, res: Response) => {
  const userId = req.params["userId"];
  const creditCard: CreditCard = req.body;
  const userWithoutCard = await UserModel.findById(userId);

  if (userWithoutCard?.creditCard?.number) {
    return res.send("Yor card was already activated");
  }

  const validation = creditCardValidation.validate(creditCard);
  if (validation.error) {
    const errorsString = getErrorMessages(validation.error.details);
    console.error(errorsString);
    return res.status(400).send(errorsString);
  }

  const userWithCard = await UserModel.findByIdAndUpdate(
    userId,
    {
      creditCard,
    },
    { new: true }
  );
  res.status(200).send(userWithCard);
};

export { getUserById, addCard };
