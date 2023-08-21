import { DateType, Nullable } from "./common";
import { User } from "./users";

export interface CarProduction {
  brand: string;
  model: string;
  date: DateType;
  tankVolume: number;
}

export type CarStatus =
  | "free"
  | "reserved"
  | "in use"
  | "unavailable"
  | "in service";

export interface StartRun {
  startDate: DateType;
  startFuelLevel: number;
  startMilage: number;
}

export interface FinishRun {
  endDate: Nullable<DateType>;
  endFuelLevel: Nullable<number>;
  endMilage: Nullable<number>;
}

export interface CurrentRun extends StartRun, FinishRun {
  driver: User;
}

export interface Car {
  vin: number;
  registrationNumber: number | string;
  productionInfo: CarProduction;
  status: CarStatus;
  fuelLevel: number;
  mileage: number;
  location: object; // geoJson
  bookingsHistory: CurrentRun[];
}

export interface BusyCar extends CurrentRun, Car {}
