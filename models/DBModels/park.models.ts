import mongoose from "mongoose";

import { Car } from "../park";

const Schema = mongoose.Schema;

const CarSchema = new Schema<Car>({
  vin: { type: Number, required: true },
  registrationNumber: { type: Number, required: true },
  productionInfo: {
    type: {
      brand: { type: String, required: true },
      model: { type: String, required: true },
      date: { type: Date, required: true },
      tankVolume: { type: Number, required: true },
    },
    required: true,
  },
  status: { type: String, required: true },
  fuelLevel: { type: Number, required: true },
  mileage: { type: Number, required: true },

  currentRun: {
    type: {
      driver: {
        licenseNumber: Number,
        firstName: String,
        lastName: String,
        creditCard: {
          number: Number,
          owner: String,
          validThrough: Date,
        },
      },
      startDate: Date,
      startFuelLevel: Number,
      startMilage: Number,
    },
  },

  location: {
    type: {
      latitude: Number,
      longitude: Number,
    },
    required: true,
  },
  bookingHistory: {
    type: [
      {
        driver: {
          type: {
            licenseNumber: { type: Number, required: true },
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            creditCard: {
              number: Number,
              owner: String,
              validThrough: Date,
            },
          },
          required: true,
        },
        startDate: { type: Date, required: true },
        startFuelLevel: { type: Number, required: true },
        startMilage: { type: Number, required: true },
        endDate: { type: Date, required: true },
        endFuelLevel: { type: Number, required: true },
        endMilage: { type: Number, required: true },
      },
    ],
    required: true,
  },
});

const CarModel = mongoose.model("Car", CarSchema);

export { CarModel };
