export class Journey {
  readonly datetime: Date;
  readonly fromZone: number;
  readonly toZone: number;

  constructor(datetime: string | Date, fromZone: number, toZone: number) {
    this.datetime = (datetime instanceof Date) ? datetime : new Date(datetime);
    this.fromZone = fromZone;
    this.toZone = toZone;
  }

  // Behaviour separate from state: we expose small behaviour helpers
  public zonePairKey(): string {
    const a = Math.min(this.fromZone, this.toZone);
    const b = Math.max(this.fromZone, this.toZone);
    return `${a}-${b}`;
  }

  public dayKey(): string {
    // ISO date (local)
    const y = this.datetime.getFullYear();
    const m = (this.datetime.getMonth()+1).toString().padStart(2,'0');
    const d = this.datetime.getDate().toString().padStart(2,'0');
    return `${y}-${m}-${d}`;
  }

  public weekKey(): string {
    // Year + ISO week number (simple week starting Monday)
    const dt = new Date(this.datetime.getTime());
    // Set to Thursday in current week to get week number per ISO
    dt.setDate(dt.getDate() + 4 - (dt.getDay()||7));
    const yearStart = new Date(dt.getFullYear(),0,1);
    const weekNo = Math.ceil(((dt.getTime() - yearStart.getTime()) / 86400000 + 1)/7);
    return `${dt.getFullYear()}-W${weekNo}`;
  }
}
