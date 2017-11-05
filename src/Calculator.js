const _ = require('lodash');

const Calculator = {
  calculateCosts: function calculateCosts(tariff, driving, parking, kilometers) {
    let packageBudget = tariff.packageBudget || 0;

    const drivingGo = driving / 2;
    const drivingReturn = driving / 2;

    packageBudget -= drivingGo;
    let drivingExceedingPackage = 0;
    if (packageBudget < 0) {
      drivingExceedingPackage = -1 * packageBudget;
      packageBudget = 0;
    }

    packageBudget -= parking;
    let parkingExceedingPackage = 0;
    if (packageBudget < 0) {
      parkingExceedingPackage = -1 * packageBudget;
      packageBudget = 0;
    }

    packageBudget -= drivingReturn;
    if (packageBudget < 0) {
      drivingExceedingPackage -= packageBudget;
      packageBudget = 0;
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
    const costs = this.tariffs.map((tariff) => {
      const tariffWithCost = tariff;
      tariffWithCost.totalCost = this.calculateCosts(tariff, driving, parking, kilometers);
      return tariffWithCost;
    });

    return _.sortBy(costs, ['totalCost']);
  },
  tariffById: function tariffById(tariffId) {
    return this.tariffs.filter(tariff => tariffId === tariff.id)[0];
  },
};

export default Calculator;
