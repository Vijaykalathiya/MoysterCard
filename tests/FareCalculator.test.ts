import { Journey } from '../src/models/Journey';
import { FareCalculator } from '../src/services/FareCalculator';
const testData = require('./testData.json');

describe('FareCalculator', () => {
  it('computes peak fare for weekday morning', () => {
    const j = testData.FareCalculation[0];
    const journey = new Journey(j.journey.date, j.journey.fromZone, j.journey.toZone);
    expect(FareCalculator.fareFor(journey)).toBe(j.expectedFare);
  });

  it('computes off-peak fare for weekday midday', () => {
    const j = testData.FareCalculation[1];
    const journey = new Journey(j.journey.date, j.journey.fromZone, j.journey.toZone);
    expect(FareCalculator.fareFor(journey)).toBe(j.expectedFare);
  });

  it('computes peak fare for weekend at 11:00', () => {
    const j = testData.FareCalculation[2];
    const journey = new Journey(j.journey.date, j.journey.fromZone, j.journey.toZone);
    expect(FareCalculator.fareFor(journey)).toBe(j.expectedFare);
  });

  it('computes peak fare for weekend at 20:30', () => {
    const j = testData.FareCalculation[3];
    const journey = new Journey(j.journey.date, j.journey.fromZone, j.journey.toZone);
    expect(FareCalculator.fareFor(journey)).toBe(j.expectedFare);
  });

  it('computes off-peak fare for weekend at 17:30', () => {
    const j = testData.FareCalculation[4];
    const journey = new Journey(j.journey.date, j.journey.fromZone, j.journey.toZone);
    expect(FareCalculator.fareFor(journey)).toBe(j.expectedFare);
  });
});
