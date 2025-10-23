import { Journey } from '../src/models/Journey';
import { CapManager } from '../src/services/CapManager';
const testData = require('./testData.json');

describe('CapManager daily cap', () => {
  it('applies daily cap for 1-2 zone', () => {
    testData.DailyCap.forEach((scenario: any) => {
        const journeys = scenario.journeys.map((j: any) => new Journey(j.date, j.fromZone, j.toZone));
        const total = CapManager.computeTotal(journeys);
        expect(total).toBe(scenario.expectedTotal);
    });
  });
});

describe('CapManager weekly cap', () => {
  it('applies weekly cap for 1-2 zone', () => {
    testData.WeeklyCap.forEach((scenario: any) => {
      const journeys = scenario.journeys.map((j: any) => new Journey(j.date, j.fromZone, j.toZone));
      const total = CapManager.computeTotal(journeys);
      expect(total).toBe(scenario.expectedTotal);
    });
  }, 10000);
});
