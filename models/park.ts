import { User } from "./users";

export interface CarProduction {
  brand: string;
  model: string;
  date: Date;
  tankVolume: number;
}

export interface GeoJson {
  latitude: number;
  longitude: number;
}

export type CarStatus = "reserved" | "in use" | "unavailable" | "in service";

export interface StartRun {
  startDate: Date;
  startFuelLevel: number;
  startMilage: number;
}

export interface FinishRun {
  endDate: Date;
  endFuelLevel: number;
  endMilage: number;
}

export interface CurrentRun extends StartRun {
  driver: User;
}

export interface HistoryRun extends StartRun, FinishRun {
  driver: User;
}

export interface Car {
  vin: number;
  registrationNumber: number;
  productionInfo: CarProduction;
  status: CarStatus;
  fuelLevel: number;
  mileage: number;
  currentRun?: CurrentRun;
  location: GeoJson;
  bookingHistory: HistoryRun[];
}
