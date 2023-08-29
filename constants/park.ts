import { CarStatus } from "../models/park";

export const CAR_STATUSES: {
  [key: string]: CarStatus;
} = {
  inUse: "in use",
  reserved: "reserved",
  unavailable: "unavailable",
  inService: "in service",
};
