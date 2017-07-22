import Calculator from '@/Calculator';

describe('Calculator', () => {
  it('should instantiate', () => {
    const calculator = Object.create(Calculator);

    expect(calculator)
      .to.be.an('object');
  });

  describe('Car2Go', () => {
    it('should make a simple driving calculation', () => {
      const calculator = Object.create(Calculator);
      const result = calculator.tariffs.car2go.smart.calculateCost(10, 0);
      expect(result).to.equal(0.24 * 10);
    });

    it('should make a driving/parking calculation', () => {
      const calculator = Object.create(Calculator);
      const result = calculator.tariffs.car2go.smart.calculateCost(10, 5);
      expect(result).to.equal((0.24 * 10) + (0.19 * 5));
    });

    it('should list all the tariffs', () => {
      const calculator = Object.create(Calculator);
      const result = calculator.calculateAllCosts(1, 0);

      expect(result).to.have.length(3);
      expect(result[0].totalCost).to.equal(0.24);
      expect(result[1].totalCost).to.equal(0.31);
      expect(result[2].totalCost).to.equal(0.34);
    });
  });
});
