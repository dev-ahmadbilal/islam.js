import { TafseerEnum } from '../types/tafseer.enum';

type VerseTafseer = { verseNo: number; tafseer: string };
type TafseerApiResponse = { ayah: number; text: string };

export class Tafseer {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir';
  }

  /**
   * Fetches tafseer for a specific Verse in a Chapter.
   * @param chapterNumber - The number of the Chapter.
   * @param verseNumber - The number of the Verse.
   * @param tafseer - The name of the tafseer (optional).
   * @returns A promise that resolves with the tafseer for the specified Verse.
   */
  public async getVerseTafseer(
    chapterNumber: number,
    verseNumber: number,
    tafseer: TafseerEnum = TafseerEnum.TazkirulQuranEnglish,
  ): Promise<VerseTafseer> {
    const url = `${this.baseUrl}/${tafseer}/${chapterNumber}/${verseNumber}.json`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch tafseer for Chapter ${chapterNumber}, Verse ${verseNumber}`);
    }
    const data = (await response.json()) as TafseerApiResponse;
    return {
      verseNo: data.ayah,
      tafseer: data.text,
    };
  }

  /**
   * Fetches tafseer for a specific Chapter.
   * @param chapterNumber - The number of the Chapter.
   * @param tafseer - The name of the tafseer (optional).
   * @returns A promise that resolves with the tafseer for the specified Verse.
   */
  public async getChapterTafseer(
    chapterNumber: number,
    tafseer: TafseerEnum = TafseerEnum.TazkirulQuranEnglish,
  ): Promise<VerseTafseer[]> {
    const url = `${this.baseUrl}/${tafseer}/${chapterNumber}.json`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch tafseer for Chapter ${chapterNumber}`);
    }

    const data = (await response.json()) as { ayahs: TafseerApiResponse[] };
    const chapterTafseer: VerseTafseer[] = data.ayahs.map((item: TafseerApiResponse) => ({
      verseNo: item.ayah,
      tafseer: item.text,
    }));
    return chapterTafseer;
  }
}
