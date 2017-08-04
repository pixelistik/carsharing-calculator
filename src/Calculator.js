const _ = require('lodash');

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
      },
      aklasse: {
        name: 'car2go A-Klasse',
        drivingPerMinute: 0.31,
        parkingPerMinute: 0.19,
        includedKilometers: 200,
        extraKilometer: 0.29,
        rentalFee: 0,
      },
      clagla: {
        name: 'car2go CLA/GLA',
        drivingPerMinute: 0.34,
        parkingPerMinute: 0.19,
        includedKilometers: 200,
        extraKilometer: 0.29,
        rentalFee: 0,
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
      },
      minidrivensave: {
        name: "DriveNow Mini/BMW 1er Drive'n Save",
        drivingPerMinute: 0.20,
        parkingPerMinute: 0.15,
        includedKilometers: 200,
        extraKilometer: 0.29,
        rentalFee: 1,
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
      },
      bmw2: {
        name: 'DriveNow Mini Cabrio/BMW 2er',
        drivingPerMinute: 0.34,
        parkingPerMinute: 0.15,
        includedKilometers: 200,
        extraKilometer: 0.29,
        rentalFee: 1,
      },
      bmw2drivensave: {
        name: "DriveNow Mini Cabrio/BMW 2er Drive'n Save",
        drivingPerMinute: 0.24,
        parkingPerMinute: 0.15,
        includedKilometers: 200,
        extraKilometer: 0.29,
        rentalFee: 1,
      },
    },
    flinkster: {
      mini: {
        name: 'Flinkster "Mini" (Smart, Panda)',
        drivingPerMinute: 2.30 / 60,
        parkingPerMinute: 2.30 / 60,
        includedKilometers: 0,
        extraKilometer: 0.18,
        rentalFee: 0,
      },
      klein: {
        name: 'Flinkster "Klein" (Fiesta, Polo)',
        drivingPerMinute: 5.00 / 60,
        parkingPerMinute: 5.00 / 60,
        includedKilometers: 0,
        extraKilometer: 0.18,
        rentalFee: 0,
      },
      kompakt: {
        name: 'Flinkster "Kompakt" (Astra, Golf)',
        drivingPerMinute: 6.00 / 60,
        parkingPerMinute: 6.00 / 60,
        includedKilometers: 0,
        extraKilometer: 0.18,
        rentalFee: 0,
      },
      mittel: {
        name: 'Flinkster "Mittel" (Passat, Mondeo)',
        drivingPerMinute: 7.00 / 60,
        parkingPerMinute: 7.00 / 60,
        includedKilometers: 0,
        extraKilometer: 0.18,
        rentalFee: 0,
      },
    },
  },
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
    const tariffs = [];

    let keys = Object.keys(this.tariffs.car2go);
    keys.forEach((key) => {
      tariffs.push(this.tariffs.car2go[key]);
    });

    keys = Object.keys(this.tariffs.driveNow);
    keys.forEach((key) => {
      tariffs.push(this.tariffs.driveNow[key]);
    });

    keys = Object.keys(this.tariffs.flinkster);
    keys.forEach((key) => {
      tariffs.push(this.tariffs.flinkster[key]);
    });

    const costs = tariffs.map((tariff) => {
      const tariffWithCost = tariff;
      tariffWithCost.totalCost = this.calculateCosts(tariff, driving, parking, kilometers);
      return tariffWithCost;
    });

    return _.sortBy(costs, ['totalCost']);
  },
};

export default Calculator;
