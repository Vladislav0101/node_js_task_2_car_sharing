import { User } from "./users";

export interface CarProduction {
  brand: string;
  model: string;
  date: string;
  tankVolume: number;
}

export type CarStatus =
  | "free"
  | "reserved"
  | "in use"
  | "unavailable"
  | "in service";

export interface StartRun {
  startDate: string;
  startFuelLevel: number;
  startMilage: number;
}

export interface FinishRun {
  endDate: string;
  endFuelLevel: number;
  endMilage: number;
}

export interface CurrentRun extends StartRun, FinishRun {
  driver: User;
}

export interface Car {
  vin: number;
  registrationNumber: number;
  productionInfo: CarProduction;
  status: CarStatus;
  fuelLevel: number;
  mileage: number;
  location: string; // geoJson
  bookingsHistory: CurrentRun[];
}

export interface BusyCar extends CurrentRun, Car {}
