// Pure functions to determine peak/off-peak based on the rules
export class TimeService {
  static isPeak(dt: Date): boolean {
    const day = dt.getDay(); // 0=Sun..6=Sat
    const hours = dt.getHours();
    const minutes = dt.getMinutes();
    const minutesOfDay = hours*60 + minutes;

    // console.log(`Day: ${day}, Time: ${hours}:${minutes}, MinutesOfDay: ${minutesOfDay}`);

    const between = (h1m:number, h2m:number) => { 
      // console.log(`Checking if ${minutesOfDay} is between ${h1m} and ${h2m}`);
      return minutesOfDay >= h1m && minutesOfDay <= h2m; 
    };

    if (day >=1 && day <=5) { // Mon-Fri
      // 07:00 - 10:30 and 17:00 - 20:00
      if (between(7*60, 10*60 + 30)) return true;
      if (between(17*60, 20*60)) return true;
      return false;
    } else { // Sat-Sun
      // 09:00 - 11:00 and 18:00 - 22:00
      if (between(9*60, 11*60)) return true;
      if (between(18*60, 22*60)) return true;
      return false;
    }
  }
}
