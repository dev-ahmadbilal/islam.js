import { Chapter } from '../types/chapter';
import { HafsHolyQuran } from '../assets/HafsHolyQuran';
import { WarshHolyQuran } from '../assets/WarshHolyQuran';
import { TranslationEnum } from '../types/translation.enum';
import { Translation } from './translation';
import { Tafseer } from './tafseer';
import { TafseerEnum } from '../types/tafseer.enum';
import { DialectEnum } from '../types/dialect.enum';

export class Quran {
  private quran: Chapter[];

  constructor(dialect: DialectEnum = DialectEnum.Hafs) {
    if (dialect === DialectEnum.Hafs) {
      this.quran = HafsHolyQuran;
    } else {
      this.quran = WarshHolyQuran;
    }
  }

  /**
   * Get a Chapter by its index number.
   * @param index - The index number of the Chapter.
   * @returns The Chapter object or undefined if not found.
   */
  public getChapterByIndex(index: number): Chapter | undefined {
    return this.quran.find((chapter) => chapter.number === index);
  }

  /**
   * Get a Chapter by its name.
   * @param name - The name of the Chapter in English.
   * @returns The Chapter object or undefined if not found.
   */
  public getChapterByName(name: string): Chapter | undefined {
    return this.quran.find((obj) => obj.englishName === name);
  }

  /**
   * Get the list of all Chapters.
   * @returns An array of all Chapters.
   */
  public getAllChapters(): Chapter[] {
    return this.quran;
  }

  /**
   * Get the number of verses in a specific Chapter.
   * @param chapterNo - The number of the Chapter.
   * @returns The number of verses if Chapter is found, otherwise undefined.
   */
  public getNoOfVerses(chapterNo: number): number | undefined {
    const chapter = this.getChapterByIndex(chapterNo);
    return chapter?.numberOfVerses;
  }

  /**
   * Get a verse from a specific Chapter.
   * @param chapterNo - The number of the Chapter.
   * @param verseNo - The index of the verse within the Chapter.
   * @returns The verse text if found, otherwise undefined.
   */
  public getVerse(chapterNo: number, verseNo: number): string | undefined {
    const chapter = this.getChapterByIndex(chapterNo);
    return chapter?.verses[verseNo - 1]; // Arrays are zero-indexed
  }

  /**
   * Get a random verse from the Quran.
   *
   * This method selects a random Chapter (chapter) from the Quran and then
   * picks a random verse (ayah) from that Chapter. The verse is returned along
   * with the Chapter name and the verse number.
   *
   * @returns An object containing the Chapter name, verse number, and the verse text.
   */
  public getRandomVerse(): { chapter: string; verseNo: number; verse: string } {
    // Generate a random Chapter index between 1 and 114 (inclusive)
    const chapterNo = Math.floor(Math.random() * 114) + 1;

    // Get the selected Chapter by index
    const chapter = this.getChapterByIndex(chapterNo) as Chapter;

    // Generate a random verse index within the Chapter's verse count
    // The verseNo is zero-based, so we add 1 when returning the verse number
    const verseNo = Math.floor(Math.random() * chapter.numberOfVerses);

    // Create the object to return with the Chapter name, verse number, and verse text
    const randomVerse = {
      chapter: chapter.name,
      verseNo: verseNo + 1,
      verse: chapter.verses[verseNo],
    };

    // Return the randomly selected verse
    return randomVerse;
  }

  /**
   * Get a random verse from the Quran along with its translation.
   *
   * This method selects a random Chapter (surah) from the Quran,
   * picks a random verse (ayah) from that Chapter, and returns the verse
   * along with its translation in the specified language.
   *
   * @param lang The language of the translation ('en' for English, etc.).
   * @returns An object containing the Chapter name, verse number, verse text, and translation.
   */
  public getRandomVerseWithTranslation(lang?: TranslationEnum): {
    chapter: string;
    verseNo: number;
    verse: string;
    translation: string;
  } {
    // Generate a random chapter index between 1 and 114 (inclusive)
    const chapterNo = Math.floor(Math.random() * 114) + 1;

    // Get the selected chapter by index
    const chapter = this.getChapterByIndex(chapterNo) as Chapter;

    // Generate a random verse index within the chapter's verse count
    const verseIndex = Math.floor(Math.random() * chapter.numberOfVerses);

    // Get the verse and its translation
    const verse = chapter.verses[verseIndex];
    const translations = new Translation(lang);
    const verseTranslation = translations.getVerseTranslation(chapterNo, verseIndex + 1);

    // Create the object to return with the chapter name, verse number, verse text, and translation
    const randomVerseWithTranslation = {
      chapter: chapter.name,
      verseNo: verseIndex + 1,
      verse,
      translation: verseTranslation,
    };

    // Return the randomly selected verse and its translation
    return randomVerseWithTranslation;
  }

  /**
   * Get multiple verses from a specific Chapter.
   * @param chapterNo - The Chapter number.
   * @param startVerse - The starting verse number.
   * @param endVerse - The ending verse number.
   * @returns The selected verses.
   */
  public getVerseRange(chapterNo: number, startVerse: number, endVerse: number): string[] {
    const chapter = this.getChapterByIndex(chapterNo);
    if (!chapter) {
      throw new Error(`Chapter ${chapterNo} not found.`);
    }
    return chapter.verses.slice(startVerse - 1, endVerse);
  }

  /**
   * Get multiple verses with their translations.
   * @param chapterNo - The Chapter number.
   * @param startVerse - The starting verse number.
   * @param endVerse - The ending verse number.
   * @returns The selected verses with their translations.
   */
  public getVerseRangeWithTranslation(
    chapterNo: number,
    startVerse: number,
    endVerse: number,
    lang?: TranslationEnum,
  ): { verse: string; translation: string }[] {
    const verses = this.getVerseRange(chapterNo, startVerse, endVerse);
    const translations = new Translation(lang);
    return verses.map((verse, index) => ({
      verse,
      translation: translations.getVerseTranslation(chapterNo, startVerse + index),
    }));
  }

  /**
   * Get multiple verses from different Chapters.
   * @param verses - An array of objects containing chapterNo and verseNo.
   * @returns The selected verses.
   */
  public getMultipleVerses(verses: { chapterNo: number; verseNo: number }[]): string[] {
    return verses.map((v) => this.getVerseRange(v.chapterNo, v.verseNo, v.verseNo)[0]);
  }

  /**
   * Get multiple verses with their translations from different Chapters.
   * @param verses - An array of objects containing chapterNo and verseNo.
   * @returns The selected verses with their translations.
   */
  public getMultipleVersesWithTranslation(
    verses: { chapterNo: number; verseNo: number }[],
    lang?: TranslationEnum,
  ): { verse: string; translation: string }[] {
    const translations = new Translation(lang);
    return verses.map((v) => {
      const verse = this.getVerseRange(v.chapterNo, v.verseNo, v.verseNo)[0];
      const translation = translations.getVerseTranslation(v.chapterNo, v.verseNo);
      return { verse, translation };
    });
  }

  /**
   * Get a verse from a specific Chapter.
   * @param chapterNo - The number of the Chapter.
   * @param verseNo - The index of the verse within the Chapter.
   * @returns The verse text if found, otherwise undefined.
   */
  public async getVerseWithTranslationAndTafseer(
    chapterNo: number,
    verseNo: number,
    lang?: TranslationEnum,
    tafseer?: TafseerEnum,
  ) {
    try {
      const chapter = this.getChapterByIndex(chapterNo);
      if (!chapter) {
        throw new Error(`Chapter ${chapterNo} not found.`);
      }

      const verse = chapter.verses[verseNo - 1];
      if (!verse) {
        throw new Error(`Verse ${verseNo} not found in chapter ${chapterNo}.`);
      }

      const translations = new Translation(lang);
      const tafseers = new Tafseer();

      // Fetch translation and tafseer
      const translation = translations.getVerseTranslation(chapterNo, verseNo);
      const verseTafseer = await tafseers.getVerseTafseer(chapterNo, verseNo, tafseer);

      return {
        verse,
        translation,
        tafseer: verseTafseer.tafseer,
      };
    } catch (error) {
      console.error('Error fetching verse, translation, or tafseer:', error);
      throw error;
    }
  }
}
