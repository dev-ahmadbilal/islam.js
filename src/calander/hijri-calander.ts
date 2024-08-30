import { HijriDate } from '../types/hijri-date';
import { PrayerApiResponse } from '../types/prayer-api-response';

export class HijriCalendar {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'http://api.aladhan.com/v1/timings';
  }

  /**
   * Fetch Hijri date based on latitude and longitude.
   * @param date - The date in the format DD-MM-YYYY.
   * @param latitude - The latitude for the location.
   * @param longitude - The longitude for the location.
   * @param method - The calculation method for prayer times (optional).
   * @returns A promise that resolves to the Hijri date.
   */
  public async getHijriDateByLocation(
    date: string,
    latitude: number,
    longitude: number,
    method?: number,
  ): Promise<HijriDate> {
    try {
      const url = `${this.baseUrl}/${date}?latitude=${latitude}&longitude=${longitude}${method ? `&method=${method}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch Hijri date by location: ${response.statusText}`);
      }
      const data = (await response.json()) as PrayerApiResponse;
      return data.data.date.hijri;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Fetch Hijri date based on city and country.
   * @param city - The city name.
   * @param country - The country name.
   * @param method - The calculation method for prayer times (optional).
   * @returns A promise that resolves to the Hijri date.
   */
  public async getHijriDateByCity(city: string, country: string, method?: number): Promise<HijriDate> {
    try {
      const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}${method ? `&method=${method}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch Hijri date by city: ${response.statusText}`);
      }
      const data = (await response.json()) as PrayerApiResponse;
      return data.data.date.hijri;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
