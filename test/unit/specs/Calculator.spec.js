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
      const result = calculator.cost({
        tariff: calculator.tariffs.car2go.smart,
        driving: 10,
        parking: 0,
      });

      expect(result).to.equal(0.24 * 10);
    });

    it('should make a driving/parking calculation', () => {
      const calculator = Object.create(Calculator);
      const result = calculator.cost({
        tariff: calculator.tariffs.car2go.smart,
        driving: 10,
        parking: 5,
      });

      expect(result).to.equal((0.24 * 10) + (0.19 * 5));
    });
  });
});
