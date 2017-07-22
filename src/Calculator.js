const Calculator = {
  tariffs: {
    car2go: {
      smart: {
        drivingPerMinute: 0.24,
        parkingPerMinute: 0.19,
      },
    },
  },
  cost: (params) => {
    const drivingCost = params.tariff.drivingPerMinute * params.driving;
    const parkingCost = params.tariff.parkingPerMinute * params.parking;

    return drivingCost + parkingCost;
  },
};

export default Calculator;
