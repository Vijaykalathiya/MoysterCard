import {Journey} from '../models/Journey';
import {FARE_TABLE} from './constants';
import {TimeService} from './TimeService';

export class FareCalculator {
  // Compute fare for a single journey
  public static fareFor(j: Journey): number {
    const key = j.zonePairKey();
    const fareInfo = FARE_TABLE[key];
    // Open this line if there is no fare info exists
    // if (!fareInfo) throw new Error(`Unsupported zone pair: ${key}`);
    const isPeak = TimeService.isPeak(j.datetime);
    return isPeak ? fareInfo.peak : fareInfo.offpeak;
  }
}
