import { PrayerApiResponse } from '../types/prayer-api-response';
import { PrayerTimings } from '../types/prayer-timings';

export class Prayer {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'http://api.aladhan.com/v1/timings';
  }

  /**
   * Fetch prayer times for a given date, latitude, and longitude.
   * @param date - The date in the format DD-MM-YYYY.
   * @param lat - The latitude for the location.
   * @param long - The longitude for the location.
   * @param method - The calculation method for prayer times (optional).
   * @returns A promise that resolves to the prayer times data.
   */
  public async getPrayerTimesByLocation(
    date: string,
    lat: number,
    long: number,
    method?: number,
  ): Promise<PrayerTimings> {
    try {
      let url = `${this.baseUrl}/${date}?latitude=${lat}&longitude=${long}`;
      if (method) {
        url += `&method=${method}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch prayer times: ${response.statusText}`);
      }
      const resp = (await response.json()) as PrayerApiResponse;
      return resp.data.timings;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Fetch prayer times for a given city and country.
   * @param city - The city name.
   * @param country - The country name.
   * @param method - The calculation method for prayer times (optional).
   * @returns A promise that resolves to the prayer times data for the city.
   */
  public async getPrayerTimesByCity(city: string, country: string, method?: number): Promise<PrayerTimings> {
    try {
      let url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}`;
      if (method) {
        url += `&method=${method}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch prayer times by city: ${response.statusText}`);
      }
      const resp = (await response.json()) as PrayerApiResponse;
      return resp.data.timings;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
