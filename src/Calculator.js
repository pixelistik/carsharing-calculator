import tariffs from '@/tariffs';

const _ = require('lodash');

const Calculator = {
  tariffs,
  calculateCosts: function calculateCosts(tariff, driving, parking, kilometers) {
    let packageBudget = tariff.packageBudget || 0;

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

    let includedKilometersBudget = tariff.includedKilometers || 0;
    includedKilometersBudget -= kilometers;
    let kilometersExceedingIncluded = 0;
    if (includedKilometersBudget < 0) {
      kilometersExceedingIncluded = -1 * includedKilometersBudget;
    }

    return tariff.rentalFee +
      (tariff.packagePrice || 0) +
      (tariff.drivingPerMinute * drivingExceedingPackage) +
      (tariff.parkingPerMinute * parkingExceedingPackage) +
      (tariff.extraKilometer * kilometersExceedingIncluded);
  },
  calculateAllCosts: function calculateAllCosts(driving, parking, kilometers) {
    const collectedTariffs = [];

    let keys = Object.keys(this.tariffs.car2go);
    keys.forEach((key) => {
      collectedTariffs.push(this.tariffs.car2go[key]);
    });

    keys = Object.keys(this.tariffs.driveNow);
    keys.forEach((key) => {
      collectedTariffs.push(this.tariffs.driveNow[key]);
    });

    keys = Object.keys(this.tariffs.flinkster);
    keys.forEach((key) => {
      collectedTariffs.push(this.tariffs.flinkster[key]);
    });

    const costs = collectedTariffs.map((tariff) => {
      const tariffWithCost = tariff;
      tariffWithCost.totalCost = this.calculateCosts(tariff, driving, parking, kilometers);
      return tariffWithCost;
    });

    return _.sortBy(costs, ['totalCost']);
  },
};

export default Calculator;
