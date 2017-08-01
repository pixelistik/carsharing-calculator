const _ = require('lodash');

const defaultCostCalculation = function defaultCostCalculation(driving, parking, kilometers) {
  let includedKilometersBudget = this.includedKilometers;
  includedKilometersBudget -= kilometers;
  let kilometersExceedingIncluded = 0;
  if (includedKilometersBudget < 0) {
    kilometersExceedingIncluded = -1 * includedKilometersBudget;
  }

  return this.rentalFee +
    (this.drivingPerMinute * driving) +
    (this.parkingPerMinute * parking) +
    (this.extraKilometer * kilometersExceedingIncluded);
};

const defaultHourlyPackageCalculation =
function defaultHourlyPackageCalculation(driving, parking, kilometers) {
  let packageBudget = this.packageBudget;

  packageBudget -= driving;
  let drivingExceedingPackage = 0;
  if (packageBudget < 0) {
    drivingExceedingPackage = -1 * packageBudget;
    packageBudget = 0;
  }

  packageBudget -= parking;
  let parkingExceedingPackage = 0;
  if (packageBudget < 0) {
    parkingExceedingPackage = -1 * packageBudget;
  }

  let includedKilometersBudget = this.includedKilometers;
  includedKilometersBudget -= kilometers;
  let kilometersExceedingIncluded = 0;
  if (includedKilometersBudget < 0) {
    kilometersExceedingIncluded = -1 * includedKilometersBudget;
  }

  return this.rentalFee +
    this.packagePrice +
    (this.drivingPerMinute * drivingExceedingPackage) +
    (this.parkingPerMinute * parkingExceedingPackage) +
    (this.extraKilometer * kilometersExceedingIncluded);
};

const Calculator = {
  tariffs: {
    car2go: {
      smart: {
        name: 'car2go Smart',
        drivingPerMinute: 0.24,
        parkingPerMinute: 0.19,
        includedKilometers: 200,
        extraKilometer: 0.29,
        rentalFee: 0,
        calculateCost: defaultCostCalculation,
      },
      aklasse: {
        name: 'car2go A-Klasse',
        drivingPerMinute: 0.31,
        parkingPerMinute: 0.19,
        includedKilometers: 200,
        extraKilometer: 0.29,
        rentalFee: 0,
        calculateCost: defaultCostCalculation,
      },
      clagla: {
        name: 'car2go CLA/GLA',
        drivingPerMinute: 0.34,
        parkingPerMinute: 0.19,
        includedKilometers: 200,
        extraKilometer: 0.29,
        rentalFee: 0,
        calculateCost: defaultCostCalculation,
      },
    },
    driveNow: {
      mini: {
        name: 'DriveNow Mini/BMW 1er',
        drivingPerMinute: 0.31,
        parkingPerMinute: 0.15,
        includedKilometers: 200,
        extraKilometer: 0.29,
        rentalFee: 1,
        calculateCost: defaultCostCalculation,
      },
      mini3hour: {
        name: 'DriveNow Mini 3-Stunden-Paket',
        drivingPerMinute: 0.31,
        parkingPerMinute: 0.15,
        includedKilometers: 200,
        extraKilometer: 0.29,
        rentalFee: 1,
        packagePrice: 29,
        packageBudget: 3 * 60,
        calculateCost: defaultHourlyPackageCalculation,
      },
      mini6hour: {
        name: 'DriveNow Mini 6-Stunden-Paket',
        drivingPerMinute: 0.31,
        parkingPerMinute: 0.15,
        includedKilometers: 200,
        extraKilometer: 0.29,
        rentalFee: 1,
        packagePrice: 54,
        packageBudget: 6 * 60,
        calculateCost: defaultHourlyPackageCalculation,
      },
      mini9hour: {
        name: 'DriveNow Mini 9-Stunden-Paket',
        drivingPerMinute: 0.31,
        parkingPerMinute: 0.15,
        includedKilometers: 200,
        extraKilometer: 0.29,
        rentalFee: 1,
        packagePrice: 79,
        packageBudget: 9 * 60,
        calculateCost: defaultHourlyPackageCalculation,
      },
      bmw2: {
        name: 'DriveNow Mini Cabrio/BMW 2er',
        drivingPerMinute: 0.34,
        parkingPerMinute: 0.15,
        includedKilometers: 200,
        extraKilometer: 0.29,
        rentalFee: 1,
        calculateCost: defaultCostCalculation,
      },
    },
  },
  calculateAllCosts: function calculateAllCosts(driving, parking, kilometers) {
    const tariffs = [];

    let keys = Object.keys(this.tariffs.car2go);
    keys.forEach((key) => {
      tariffs.push(this.tariffs.car2go[key]);
    });

    keys = Object.keys(this.tariffs.driveNow);
    keys.forEach((key) => {
      tariffs.push(this.tariffs.driveNow[key]);
    });

    const costs = tariffs.map((tariff) => {
      const tariffWithCost = tariff;
      tariffWithCost.totalCost = tariff.calculateCost(driving, parking, kilometers);
      return tariffWithCost;
    });

    return _.sortBy(costs, ['totalCost']);
  },
};

export default Calculator;
