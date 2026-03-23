import { Quran, DialectEnum, TranslationEnum, TafseerEnum } from '../src';
import { Tafseer } from '../src/quran/tafseer';

jest.mock('../src/quran/tafseer');

describe('Quran Class', () => {
  let quran: Quran;

  beforeEach(() => {
    quran = new Quran();
    jest.clearAllMocks();
  });

  test('should return the correct chapter by index', () => {
    const result = quran.getChapterByIndex(108);
    expect(result).toMatchObject({
      englishName: 'Al-Kawthar',
      number: 108,
      numberOfLetters: 42,
      numberOfVerses: 3,
      numberOfWords: 10,
    });
    expect(result?.verses).toHaveLength(3);
  });

  test('should return the correct chapter by name', () => {
    const result = quran.getChapterByName('Al-Ekhlas');
    expect(result).toMatchObject({
      englishName: 'Al-Ekhlas',
      number: 112,
      numberOfLetters: 47,
      numberOfVerses: 4,
      numberOfWords: 15,
    });
    expect(result?.verses).toHaveLength(4);
  });

  test('should return a verse by chapterNo and verseNo', () => {
    const result = quran.getVerse(21, 107);
    expect(typeof result).toBe('string');
    expect(result?.length).toBeGreaterThan(0);
  });

  test('should return all 114 chapters', () => {
    const chapters = quran.getAllChapters();
    expect(chapters).toHaveLength(114);
  });

  test('should return correct number of verses for a chapter', () => {
    expect(quran.getNoOfVerses(1)).toBe(7);
    expect(quran.getNoOfVerses(112)).toBe(4);
    expect(quran.getNoOfVerses(108)).toBe(3);
  });

  test('should return undefined for non-existent chapter by index', () => {
    expect(quran.getChapterByIndex(999)).toBeUndefined();
  });

  test('should return undefined for non-existent chapter by name', () => {
    expect(quran.getChapterByName('NonExistentChapter')).toBeUndefined();
  });

  test('should return undefined for getNoOfVerses on invalid chapter', () => {
    expect(quran.getNoOfVerses(999)).toBeUndefined();
  });

  test('should return undefined for verse in non-existent chapter', () => {
    expect(quran.getVerse(999, 1)).toBeUndefined();
  });

  test('should return a random verse with valid structure', () => {
    const result = quran.getRandomVerse();
    expect(result).toHaveProperty('chapter');
    expect(result).toHaveProperty('verseNo');
    expect(result).toHaveProperty('verse');
    expect(typeof result.chapter).toBe('string');
    expect(typeof result.verseNo).toBe('number');
    expect(typeof result.verse).toBe('string');
    expect(result.verseNo).toBeGreaterThanOrEqual(1);
  });

  test('should return a random verse with translation in default language', () => {
    const result = quran.getRandomVerseWithTranslation();
    expect(result).toHaveProperty('chapter');
    expect(result).toHaveProperty('verseNo');
    expect(result).toHaveProperty('verse');
    expect(result).toHaveProperty('translation');
    expect(typeof result.translation).toBe('string');
    expect(result.translation.length).toBeGreaterThan(0);
  });

  test('should return a random verse with translation in specified language', () => {
    const result = quran.getRandomVerseWithTranslation(TranslationEnum.French);
    expect(result).toHaveProperty('translation');
    expect(typeof result.translation).toBe('string');
  });

  test('should return verse range from a chapter', () => {
    const result = quran.getVerseRange(1, 1, 3);
    expect(result).toHaveLength(3);
    result.forEach((v) => expect(typeof v).toBe('string'));
  });

  test('should return a single verse range', () => {
    const result = quran.getVerseRange(1, 1, 1);
    expect(result).toHaveLength(1);
  });

  test('should throw error for invalid chapter in getVerseRange', () => {
    expect(() => quran.getVerseRange(999, 1, 3)).toThrow('Chapter 999 not found.');
  });

  test('should return verse range with translation', () => {
    const result = quran.getVerseRangeWithTranslation(1, 1, 3);
    expect(result).toHaveLength(3);
    result.forEach((item) => {
      expect(item).toHaveProperty('verse');
      expect(item).toHaveProperty('translation');
      expect(typeof item.verse).toBe('string');
      expect(typeof item.translation).toBe('string');
    });
  });

  test('should return verse range with translation in specified language', () => {
    const result = quran.getVerseRangeWithTranslation(1, 1, 2, TranslationEnum.Urdu);
    expect(result).toHaveLength(2);
    result.forEach((item) => {
      expect(item).toHaveProperty('verse');
      expect(item).toHaveProperty('translation');
    });
  });

  test('should return multiple verses from different chapters', () => {
    const result = quran.getMultipleVerses([
      { chapterNo: 1, verseNo: 1 },
      { chapterNo: 112, verseNo: 1 },
      { chapterNo: 21, verseNo: 107 },
    ]);
    expect(result).toHaveLength(3);
    result.forEach((verse) => expect(typeof verse).toBe('string'));
  });

  test('should return multiple verses with translation', () => {
    const result = quran.getMultipleVersesWithTranslation([
      { chapterNo: 21, verseNo: 107 },
      { chapterNo: 1, verseNo: 1 },
    ]);
    expect(result).toHaveLength(2);
    result.forEach((item) => {
      expect(item).toHaveProperty('verse');
      expect(item).toHaveProperty('translation');
    });
  });

  test('should return multiple verses with translation in default language (English)', () => {
    const result = quran.getMultipleVersesWithTranslation([{ chapterNo: 21, verseNo: 107 }]);
    expect(result[0].translation).toContain('mercy');
  });

  test('should return multiple verses with translation in French', () => {
    const result = quran.getMultipleVersesWithTranslation([{ chapterNo: 21, verseNo: 107 }], TranslationEnum.French);
    expect(result[0].translation).toContain('miséricorde');
  });

  test('should work with Warsh dialect', () => {
    const warshQuran = new Quran(DialectEnum.Warsh);
    const chapter = warshQuran.getChapterByName('Al-Ekhlas');
    expect(chapter).toBeDefined();
    expect(chapter?.number).toBe(112);
    expect(warshQuran.getAllChapters()).toHaveLength(114);
  });

  test('should return verse with translation and tafseer', async () => {
    const MockedTafseer = Tafseer as jest.MockedClass<typeof Tafseer>;
    MockedTafseer.prototype.getVerseTafseer = jest.fn().mockResolvedValue({
      verseNo: 107,
      tafseer: 'Mock tafseer text',
    });

    const result = await quran.getVerseWithTranslationAndTafseer(21, 107);
    expect(result).toHaveProperty('verse');
    expect(result).toHaveProperty('translation');
    expect(result).toHaveProperty('tafseer');
    expect(result.tafseer).toBe('Mock tafseer text');
  });

  test('should pass tafseer enum to getVerseWithTranslationAndTafseer', async () => {
    const MockedTafseer = Tafseer as jest.MockedClass<typeof Tafseer>;
    const mockGetVerseTafseer = jest.fn().mockResolvedValue({
      verseNo: 1,
      tafseer: 'Tafsir Ibn Kathir text',
    });
    MockedTafseer.prototype.getVerseTafseer = mockGetVerseTafseer;

    await quran.getVerseWithTranslationAndTafseer(1, 1, TranslationEnum.Urdu, TafseerEnum.TafsirIbnKathir);
    expect(mockGetVerseTafseer).toHaveBeenCalledWith(1, 1, TafseerEnum.TafsirIbnKathir);
  });

  test('should throw error for invalid chapter in getVerseWithTranslationAndTafseer', async () => {
    await expect(quran.getVerseWithTranslationAndTafseer(999, 1)).rejects.toThrow('Chapter 999 not found.');
  });

  test('should throw error for invalid verse in getVerseWithTranslationAndTafseer', async () => {
    await expect(quran.getVerseWithTranslationAndTafseer(1, 999)).rejects.toThrow('Verse 999 not found in chapter 1.');
  });
});
