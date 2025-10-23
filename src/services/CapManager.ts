import {Journey} from '../models/Journey';
import {DAILY_CAP, WEEKLY_CAP} from './constants';
import {FareCalculator} from './FareCalculator';

export class CapManager {
  // Compute total fare for journeys considering daily and weekly caps
  // Approach:
  // 1. Group journeys by day
  // 2. For each day, accumulate fares until daily cap for that day's farthest zone is reached
  // 3. Sum daily totals and apply weekly cap based on the farthest zone in the whole week.
  static computeTotal(journeys: Journey[]): number {
    if (journeys.length === 0) return 0;
    // Group by week then by day (we'll assume all journeys passed belong to the same commuter)
    // For simplicity, compute weeklyKey from first journey (all journeys may be across weeks; handle generically)
    const byWeek = new Map<string, Journey[]>();
    for (const j of journeys) {
      const wk = j.weekKey();
      if (!byWeek.has(wk)) byWeek.set(wk, []);
      byWeek.get(wk)!.push(j);
    }

    let grandTotal = 0;

    for (const [wk, weekJourneys] of byWeek.entries()) {
      // Determine weekly farthest zone key
      const weeklyFarthest = CapManager._farthestKeyFromJourneys(weekJourneys);
      const weeklyCap = WEEKLY_CAP[weeklyFarthest]; // can use Infinity if no cap defined

      // Group by day
      const byDay = new Map<string, Journey[]>();
      for (const j of weekJourneys) {
        const d = j.dayKey();
        if (!byDay.has(d)) byDay.set(d, []);
        byDay.get(d)!.push(j);
      }

      let weeklyTotal = 0;

      for (const [day, dayJourneys] of byDay.entries()) {
        const dayFarthest = CapManager._farthestKeyFromJourneys(dayJourneys);
        const dailyCap = DAILY_CAP[dayFarthest]; // can use Infinity if no cap defined

        // Sort journeys by datetime to simulate tap order
        dayJourneys.sort((a,b) => a.datetime.getTime() - b.datetime.getTime());

        let dayTotal = 0;
        for (const journey of dayJourneys) {
          const fare = FareCalculator.fareFor(journey);
          // console.log(`Fare for ${journey}: ${fare}`);
          const chargeable = Math.min(fare, dailyCap - dayTotal, weeklyCap - weeklyTotal);
          // chargeable could be negative if caps reached; ensure >=0
          const actualCharge = Math.max(0, chargeable);
          dayTotal += actualCharge;
          weeklyTotal += actualCharge;

          // console.log(`  Charging: ${actualCharge}, Day total: ${dayTotal}, Weekly total: ${weeklyTotal}`);
          // early stop if weekly cap reached
          if (weeklyTotal >= weeklyCap) break;
        }
        grandTotal += dayTotal;
        // if weekly cap reached, subsequent days will be zero for that week
        if (weeklyTotal >= weeklyCap) break;
      }
    }

    return grandTotal;
  }

  // Determines the applicable cap key (farthest journey) given a set of journeys
  private static _farthestKeyFromJourneys(journeys: Journey[]): string {
    // Map to most expensive zone pair seen (by WEEKLY_CAP values)
    let bestKey = '1-1';
    let bestVal = 0;
    for (const j of journeys) {
      const k = j.zonePairKey();
      const v = WEEKLY_CAP[k]; // can use 0 if no cap defined
      if (v > bestVal) { bestVal = v; bestKey = k; }
    }
    return bestKey;
  }
}
