export interface CreditCard {
  _id?: string;
  number: number;
  owner: string;
  validThrough: string;
}

export interface User {
  _id?: string;
  licenseNumber: number;
  firstName: string;
  lastName: string;
  creditCard?: CreditCard;
  __v?: number;
}
