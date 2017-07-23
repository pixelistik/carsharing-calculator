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

    return _.sortBy(costs, ['cost']);
  },
};

export default Calculator;
