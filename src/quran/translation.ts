import getTranslation from '../assets/translations';
import { TranslationEnum } from '../types/translation.enum';

export class Translation {
  private translation: string[][];

  constructor(lang: TranslationEnum = TranslationEnum.English) {
    this.translation = getTranslation(lang);
  }

  /**
   * Get the entire translation of a specific chapter.
   * @param chapterNumber - The chapter number to retrieve.
   * @returns An array of verses for the specified chapter.
   */
  public getChapterTranslation(chapterNumber: number): string[] {
    return this.translation[chapterNumber - 1]; // Arrays are zero-indexed
  }

  /**
   * Get the translation of a specific verse from a chapter.
   * @param chapterNumber - The chapter number.
   * @param verseNumber - The verse number within the chapter.
   * @returns The translation of the specified verse.
   */
  public getVerseTranslation(chapterNumber: number, verseNumber: number): string {
    const chapter = this.getChapterTranslation(chapterNumber);
    if (chapter && chapter[verseNumber - 1]) {
      return chapter[verseNumber - 1]; // Get the specific verse
    }

    throw new Error(`Verse ${verseNumber} not found in Chapter ${chapterNumber}`);
  }

  /**
   * Get the translation of a verse by its key (chapter:verse).
   * @param key - The key in the format "chapter:verse" (e.g., "2:255").
   * @returns The translation of the specified verse.
   */
  public getVerseTranslationByKey(key: string): string {
    const [chapterNumber, verseNumber] = key.split(':').map(Number);
    return this.getVerseTranslation(chapterNumber, verseNumber);
  }

  /**
   * Get translations of multiple verses within a chapter.
   * @param chapterNumber - The chapter number.
   * @param verseNumbers - An array of verse numbers to retrieve.
   * @returns An array of translations for the specified verses.
   */
  public getMultipleVerseTranslations(chapterNumber: number, verseNumbers: number[]): string[] {
    return verseNumbers.map((verseNumber) => this.getVerseTranslation(chapterNumber, verseNumber));
  }

  /**
   * Get the translation of an entire range of verses within a chapter.
   * @param chapterNumber - The chapter number.
   * @param startVerse - The starting verse number.
   * @param endVerse - The ending verse number.
   * @returns An array of translations for the specified verse range.
   */
  public getVerseRangeTranslation(chapterNumber: number, startVerse: number, endVerse: number): string[] {
    const chapter = this.getChapterTranslation(chapterNumber);
    if (startVerse < 1 || endVerse > chapter.length) {
      throw new Error(`Verse range ${startVerse}-${endVerse} is out of bounds in Chapter ${chapterNumber}`);
    }
    return chapter.slice(startVerse - 1, endVerse);
  }
}
