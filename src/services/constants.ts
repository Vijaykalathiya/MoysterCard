export const FARE_TABLE: Record<string, {peak:number, offpeak:number}> = {
  '1-1': { peak: 30, offpeak: 25 },
  '1-2': { peak: 35, offpeak: 30 },
  '2-2': { peak: 25, offpeak: 20 }
};

export const DAILY_CAP: Record<string, number> = {
  '1-1': 100,
  '1-2': 120,
  '2-2': 80
};

export const WEEKLY_CAP: Record<string, number> = {
  '1-1': 500,
  '1-2': 600,
  '2-2': 400
};
