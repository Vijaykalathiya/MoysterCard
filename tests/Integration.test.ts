import {Journey} from '../src/models/Journey';
import {MoysterCard} from '../src/MoysterCard';

describe('MoysterCard integration', () => {
  it('computes total for sample journeys.json', () => {
    const journeys = [
      new Journey('2025-10-20T07:30:00',2,1),
      new Journey('2025-10-20T10:45:00',1,1)
    ];
    const card = new MoysterCard();
    const total = card.calculateTotal(journeys);
    // 35 (peak 2-1) + 25 (off-peak 1-1) = 60
    expect(total).toBe(60);
  });
});
