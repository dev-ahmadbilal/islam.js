import { HadithBook } from '../types/hadith.enum';
import { HadithLangEnum } from '../types/hadith-lang.enum';
import { hadithBookLanguages } from './hadith-book-lang-mapper';
import { HadithObject } from '../types/hadith-object';
import { HadithApiResponse, HadithEditionApiResponse, HadithInfoApiResponse } from '../types/hadith-api-response';
import * as HadithMappers from './hadith-response-mappers';
import { HadithInfo } from '../types';
import { HadithBySection } from '../types/hadith-by-section';
import { HadithEdition } from '../types/hadith-edition';

export class Hadith {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1';
  }

  /**
   * Gets the edition slug based on the selected Hadith book and language.
   * @param book - The Hadith book to get the edition slug for.
   * @param lang - The language for the Hadith edition (default is English).
   * @returns The edition slug as a string or null if the language is not available for the selected book.
   */
  private getEditionSlug(book: HadithBook, lang: HadithLangEnum = HadithLangEnum.English): string | null {
    const availableLanguages = hadithBookLanguages[book];
    if (availableLanguages.includes(lang)) {
      const bookSlug = book.toLowerCase().replace(/ /g, '');
      return `${lang}-${bookSlug}`;
    } else {
      return null;
    }
  }

  /**
   * Fetches all available editions of the Hadith.
   * @param prettified - Whether to fetch the prettified JSON (default is true).
   * @returns A promise that resolves with the fetched data.
   */
  private async getAllEditions(prettified: boolean = true) {
    const url = `${this.baseUrl}/editions${prettified ? '.json' : '.min.json'}`;
    return this.fetchData(url);
  }

  /**
   * Fetches the full content of a specific Hadith edition.
   * @param book - The Hadith book to fetch.
   * @param lang - The language of the Hadith edition (optional).
   * @returns A promise that resolves with the fetched data.
   */
  public async getEdition(book: HadithBook, lang?: HadithLangEnum): Promise<HadithEdition> {
    const slug = this.getEditionSlug(book, lang);
    const url = `${this.baseUrl}/editions/${slug}.json`;
    const resp = (await this.fetchData(url)) as HadithEditionApiResponse;
    return HadithMappers.mapHadithEditionResponse(resp);
  }

  /**
   * Fetches a specific Hadith by its number.
   * @param book - The Hadith book to fetch from.
   * @param hadithNo - The number of the Hadith to fetch.
   * @param lang - The language of the Hadith edition (optional).
   * @returns A promise that resolves with the fetched data.
   */
  public async getHadith(book: HadithBook, hadithNo: number, lang?: HadithLangEnum): Promise<HadithObject> {
    const slug = this.getEditionSlug(book, lang);
    const url = `${this.baseUrl}/editions/${slug}/${hadithNo}.json`;
    const resp = (await this.fetchData(url)) as HadithApiResponse;
    return HadithMappers.mapHadithResponse(resp);
  }

  /**
   * Fetches a specific section of a Hadith book by its number.
   * @param book - The Hadith book to fetch from.
   * @param sectionNo - The number of the section to fetch.
   * @param lang - The language of the Hadith edition (optional).
   * @returns A promise that resolves with the fetched data.
   */
  public async getSection(book: HadithBook, sectionNo: number, lang?: HadithLangEnum): Promise<HadithBySection> {
    const slug = this.getEditionSlug(book, lang);
    const url = `${this.baseUrl}/editions/${slug}/sections/${sectionNo}.json`;
    const resp = (await this.fetchData(url)) as HadithApiResponse;
    return HadithMappers.mapHadithSectionResponse(resp, sectionNo);
  }

  /**
   * Fetches general information about the available Hadith books.
   * @returns A promise that resolves with the type HadithInfo.
   */
  public async getBooksInfo(): Promise<HadithInfo> {
    const url = `${this.baseUrl}/info.json`;
    const resp = (await this.fetchData(url)) as HadithInfoApiResponse;
    return HadithMappers.mapHadithInfoResponse(resp);
  }

  /**
   * Utility method to fetch data from the given API URL.
   * @param url - The URL to fetch data from.
   * @returns A promise that resolves with the fetched data or throws an error if the fetch fails.
   */
  private async fetchData(url: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
