import { HijriDate } from './hijri-date';
import { PrayerTimings } from './prayer-timings';
import { PrayerMeta } from './prayer.metadata';

export interface PrayerApiResponse {
  code: number;
  status: string;
  data: {
    timings: PrayerTimings;
    date: {
      readable: string;
      timestamp: string;
      gregorian: unknown;
      hijri: HijriDate;
    };
    meta: PrayerMeta;
  };
}
