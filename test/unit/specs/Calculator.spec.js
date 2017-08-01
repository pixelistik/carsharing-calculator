import Calculator from '@/Calculator';

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = Object.create(Calculator);
  });

  it('should instantiate', () => {
    expect(calculator)
      .to.be.an('object');
  });

  it('should list all the tariffs', () => {
    const result = calculator.calculateAllCosts(1, 0, 1);

    expect(result).to.have.length(14);
  });

  describe('Car2Go', () => {
    it('should make a simple driving calculation', () => {
      const result = calculator.tariffs.car2go.smart.calculateCost(10, 0, 1);
      expect(result).to.equal(0.24 * 10);
    });

    it('should make a driving/parking calculation', () => {
      const result = calculator.tariffs.car2go.smart.calculateCost(10, 5, 1);
      expect(result).to.equal((0.24 * 10) + (0.19 * 5));
    });

    describe('Distance fees', () => {
      it('should add the cost for kilometers that exceed the included 200 km', () => {
        const result = calculator.tariffs.car2go.smart.calculateCost(10, 0, 203);
        expect(result).to.equal((0.24 * 10) + (0.29 * 3));
      });
    });
  });

  describe('DriveNow', () => {
    it('should add the insurance fee of 1 EUR to the cost', () => {
      const result = calculator.tariffs.driveNow.mini.calculateCost(1, 0, 1);
      expect(result).to.equal(1 + 0.31);
    });

    describe('Hour Packages', () => {
      it('should apply the package price when the usage time is below the package time', () => {
        const result = calculator.tariffs.driveNow.mini3hour.calculateCost(10, 5, 1);
        expect(result).to.equal(1 + 29);
      });

      it('should add minutes that are above the package driving time', () => {
        const result = calculator.tariffs.driveNow.mini3hour.calculateCost(181, 0, 1);
        expect(result).to.equal(1 + 29 + 0.31);
      });

      it('should add parking minutes that are above the package driving time', () => {
        const result = calculator.tariffs.driveNow.mini3hour.calculateCost(180, 1, 1);
        expect(result).to.equal(1 + 29 + 0.15);
      });

      it('should add driving and parking minutes that are above the package time', () => {
        const result = calculator.tariffs.driveNow.mini3hour.calculateCost(190, 10, 1);
        expect(result).to.equal(1 + 29 + (10 * 0.31) + (10 * 0.15));
      });
    });
  });
});
