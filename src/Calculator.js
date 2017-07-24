const _ = require('lodash');

const defaultCostCalculation = function defaultCostCalculation(driving, parking) {
  return this.rentalFee + (this.drivingPerMinute * driving) + (this.parkingPerMinute * parking);
};

const defaultHourlyPackageCalculation = function defaultHourlyPackageCalculation(driving, parking) {
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

  return this.rentalFee +
    this.packagePrice +
    (this.drivingPerMinute * drivingExceedingPackage) +
    (this.parkingPerMinute * parkingExceedingPackage);
};

const Calculator = {
  tariffs: {
    car2go: {
      smart: {
        name: 'car2go Smart',
        drivingPerMinute: 0.24,
        parkingPerMinute: 0.19,
        rentalFee: 0,
        calculateCost: defaultCostCalculation,
      },
      aklasse: {
        name: 'car2go A-Klasse',
        drivingPerMinute: 0.31,
        parkingPerMinute: 0.19,
        rentalFee: 0,
        calculateCost: defaultCostCalculation,
      },
      clagla: {
        name: 'car2go CLA/GLA',
        drivingPerMinute: 0.34,
        parkingPerMinute: 0.19,
        rentalFee: 0,
        calculateCost: defaultCostCalculation,
      },
    },
    driveNow: {
      mini: {
        name: 'DriveNow Mini/BMW 1er',
        drivingPerMinute: 0.31,
        parkingPerMinute: 0.15,
        rentalFee: 1,
        calculateCost: defaultCostCalculation,
      },
      mini3hour: {
        name: 'DriveNow Mini 3 hour package',
        drivingPerMinute: 0.31,
        parkingPerMinute: 0.15,
        rentalFee: 1,
        packagePrice: 29,
        packageBudget: 3 * 60,
        calculateCost: defaultHourlyPackageCalculation,
      },
      mini6hour: {
        name: 'DriveNow Mini 6 hour package',
        drivingPerMinute: 0.31,
        parkingPerMinute: 0.15,
        rentalFee: 1,
        packagePrice: 54,
        packageBudget: 6 * 60,
        calculateCost: defaultHourlyPackageCalculation,
      },
      mini9hour: {
        name: 'DriveNow Mini 9 hour package',
        drivingPerMinute: 0.31,
        parkingPerMinute: 0.15,
        rentalFee: 1,
        packagePrice: 79,
        packageBudget: 9 * 60,
        calculateCost: defaultHourlyPackageCalculation,
      },
      bmw2: {
        name: 'DriveNow Mini Cabrio/BMW 2er',
        drivingPerMinute: 0.34,
        parkingPerMinute: 0.15,
        rentalFee: 1,
        calculateCost: defaultCostCalculation,
      },
    },
  },
  calculateAllCosts: function calculateAllCosts(driving, parking) {
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
      tariffWithCost.totalCost = tariff.calculateCost(driving, parking);
      return tariffWithCost;
    });

    return _.sortBy(costs, ['totalCost']);
  },
};

export default Calculator;
