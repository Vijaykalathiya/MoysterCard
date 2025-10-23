import {Journey} from './models/Journey';
import {CapManager} from './services/CapManager';

export class MoysterCard {
  // Stateless utility - calculate total fare for a list of journeys
  public calculateTotal(journeys: Journey[]): number {
    return CapManager.computeTotal(journeys);
  }
}
