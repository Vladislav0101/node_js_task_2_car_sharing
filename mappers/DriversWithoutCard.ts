import { Car } from "../models/park";

interface DriverInfo {
  firstName: string;
  lastName: string;
  licenseNumber: number;
}

interface MapInterface extends DriverInfo {
  vin: number;
  location: string;
}

export default (cars: Car[]) =>
  cars.reduce((driversWithoutCard: MapInterface[], car: Car) => {
    const map = ({ firstName, lastName, licenseNumber }: DriverInfo) => ({
      vin: car.vin,
      location: car.location,
      firstName,
      lastName,
      licenseNumber,
    });

    if (car.currentRun && !car?.currentRun?.driver?.creditCard?.number)
      driversWithoutCard.push(map(car.currentRun.driver));

    car.bookingHistory.forEach((run) => {
      if (!run.driver.creditCard?.number)
        driversWithoutCard.push(map(run.driver));
    });

    return driversWithoutCard;
  }, []);
