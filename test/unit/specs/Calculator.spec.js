import Calculator from '@/Calculator';
import tariffs from '@/tariffs';

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = Object.create(Calculator);
    calculator.tariffs = tariffs;
  });

  it('should instantiate', () => {
    expect(calculator)
      .to.be.an('object');
  });

  it('should list all the tariffs', () => {
    const result = calculator.calculateAllCosts(1, 0, 1);

    expect(result).to.have.length(28);
  });

  it('should not throw exceptions when tariffs are not set', () => {
    calculator = Object.create(Calculator);
    calculator.calculateAllCosts(1, 0, 1);
  });

  describe('Car2Go', () => {
    it('should make a simple driving calculation', () => {
      const result = calculator.calculateCosts(calculator.tariffById('car2go.smart'), 10, 0, 1);
      expect(result).to.equal(0.26 * 10);
    });

    it('should make a driving/parking calculation', () => {
      const result =
        calculator.calculateCosts(calculator.tariffById('driveNow.mini'), 10, 5, 1);
      expect(result).to.equal(1 + (0.33 * 10) + (0.33 * 5));
    });

    describe('Distance fees', () => {
      it('should add the cost for kilometers that exceed the included 200 km', () => {
        const result = calculator.calculateCosts(calculator.tariffById('car2go.smart'), 10, 0, 203);
        expect(result).to.equal((0.26 * 10) + (0.29 * 3));
      });
    });
  });

  describe('DriveNow', () => {
    it('should add the insurance fee of 1 EUR to the cost', () => {
      const result = calculator.calculateCosts(calculator.tariffById('driveNow.mini'), 1, 0, 1);
      expect(result).to.equal(1 + 0.33);
    });

    describe('Hour Packages', () => {
      it('should apply the package price when the usage time is below the package time', () => {
        const result = calculator.calculateCosts(calculator.tariffById('driveNow.mini3hour'), 10, 5, 1);
        expect(result).to.equal(1 + 29);
      });

      it('should add minutes that are above the package driving time', () => {
        const result = calculator.calculateCosts(calculator.tariffById('driveNow.mini3hour'), 181, 0, 1);
        expect(result).to.equal(1 + 29 + 0.33);
      });

      it('should add driving and parking minutes that are above the package time, assuming a drive/park/drive cycle', () => {
        // This is the assumed trip:
        // Drive there: 170 min
        // Park 20 min (half of which overlaps into extra time)
        // Drive back: 170 min (all are extra time)
        const result = calculator.calculateCosts(calculator.tariffById('driveNow.mini3hour'), 340, 20, 1);
        expect(result).to.equal(1 + 29 + (170 * 0.33) + (10 * 0.33));
      });
    });
  });
});
