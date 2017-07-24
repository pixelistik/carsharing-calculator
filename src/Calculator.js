const _ = require('lodash');

const defaultCostCalculation = function defaultCostCalculation(driving, parking) {
  return (this.drivingPerMinute * driving) + (this.parkingPerMinute * parking);
};

const Calculator = {
  tariffs: {
    car2go: {
      smart: {
        name: 'car2go Smart',
        drivingPerMinute: 0.24,
        parkingPerMinute: 0.19,
        calculateCost: defaultCostCalculation,
      },
    },
    driveNow: {
      mini: {
        name: 'DriveNow Mini',
        drivingPerMinute: 0.31,
        parkingPerMinute: 0.15,
        calculateCost: defaultCostCalculation,
      },
      mini3hour: {
        name: 'DriveNow Mini 3 hour package',
        drivingPerMinute: 0.31,
        parkingPerMinute: 0.15,
        packagePrice: 29,
        calculateCost: function calculateCost(driving, parking) {
          const drivingExceedingPackage = _.clamp(driving - (3 * 60), 0, Infinity);

          let parkingExceedingPackage = 0;

          if (drivingExceedingPackage === 0) {
            parkingExceedingPackage = _.clamp((driving + parking) - (3 * 60), 0, Infinity);
          }

          return this.packagePrice +
            (this.drivingPerMinute * drivingExceedingPackage) +
            (this.parkingPerMinute * parkingExceedingPackage);
        },
      },
      bmw2: {
        name: 'DriveNow BMW 2er',
        drivingPerMinute: 0.34,
        parkingPerMinute: 0.15,
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
