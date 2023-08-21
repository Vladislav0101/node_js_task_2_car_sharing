import { DateType } from "./common";

export interface CreditCard {
  number: number;
  owner: string;
  validThrough: DateType;
}

export interface User {
  licenseNumber: number;
  firstName: string;
  lastName: string;
  creditCard: CreditCard;
}
