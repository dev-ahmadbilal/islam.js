import { Translation } from '../src';
import { TranslationEnum } from '../src';

describe('Translation Class', () => {
  let translation: Translation;

  beforeEach(() => {
    translation = new Translation();
  });

  test('should default to English translation', () => {
    const verse = translation.getVerseTranslation(21, 107);
    expect(verse).toContain('mercy');
  });

  test('should return chapter translation as array', () => {
    const chapter = translation.getChapterTranslation(112);
    expect(Array.isArray(chapter)).toBe(true);
    expect(chapter.length).toBe(4);
  });

  test('should return verse translation by number', () => {
    const verse = translation.getVerseTranslation(112, 1);
    expect(typeof verse).toBe('string');
    expect(verse.length).toBeGreaterThan(0);
  });

  test('should return verse translation by key format', () => {
    const verse = translation.getVerseTranslationByKey('21:107');
    expect(verse).toContain('mercy');
  });

  test('should match getVerseTranslation and getVerseTranslationByKey', () => {
    const byNumber = translation.getVerseTranslation(1, 1);
    const byKey = translation.getVerseTranslationByKey('1:1');
    expect(byNumber).toBe(byKey);
  });

  test('should return multiple verse translations', () => {
    const verses = translation.getMultipleVerseTranslations(112, [1, 2, 3, 4]);
    expect(verses).toHaveLength(4);
    verses.forEach((v) => {
      expect(typeof v).toBe('string');
      expect(v.length).toBeGreaterThan(0);
    });
  });

  test('should return verse range translation', () => {
    const verses = translation.getVerseRangeTranslation(1, 1, 7);
    expect(verses).toHaveLength(7);
    verses.forEach((v) => expect(typeof v).toBe('string'));
  });

  test('should return partial verse range translation', () => {
    const verses = translation.getVerseRangeTranslation(112, 2, 4);
    expect(verses).toHaveLength(3);
  });

  test('should throw error for out-of-bounds verse range', () => {
    expect(() => translation.getVerseRangeTranslation(112, 0, 4)).toThrow();
  });

  test('should throw error for verse not found', () => {
    expect(() => translation.getVerseTranslation(112, 999)).toThrow('Verse 999 not found in Chapter 112');
  });

  test('should work with French translation', () => {
    const frTranslation = new Translation(TranslationEnum.French);
    const verse = frTranslation.getVerseTranslation(21, 107);
    expect(verse).toContain('miséricorde');
  });

  test('should work with Urdu translation', () => {
    const urTranslation = new Translation(TranslationEnum.Urdu);
    const chapter = urTranslation.getChapterTranslation(112);
    expect(Array.isArray(chapter)).toBe(true);
    expect(chapter.length).toBe(4);
  });

  test('should work with Arabic-script languages (Bengali)', () => {
    const bnTranslation = new Translation(TranslationEnum.Bengali);
    const verse = bnTranslation.getVerseTranslation(1, 1);
    expect(typeof verse).toBe('string');
    expect(verse.length).toBeGreaterThan(0);
  });

  test('should work with Turkish translation', () => {
    const trTranslation = new Translation(TranslationEnum.Turkish);
    const verse = trTranslation.getVerseTranslation(112, 1);
    expect(typeof verse).toBe('string');
    expect(verse.length).toBeGreaterThan(0);
  });

  test('should work with Spanish translation', () => {
    const esTranslation = new Translation(TranslationEnum.Spanish);
    const verse = esTranslation.getVerseTranslation(112, 1);
    expect(typeof verse).toBe('string');
  });

  test('should work with Indonesian translation', () => {
    const idTranslation = new Translation(TranslationEnum.Indonesian);
    const verse = idTranslation.getVerseTranslation(1, 1);
    expect(typeof verse).toBe('string');
  });

  test('getChapterTranslation should return 114 chapters worth of data from Al-Fatiha to Al-Nas', () => {
    const firstChapter = translation.getChapterTranslation(1);
    const lastChapter = translation.getChapterTranslation(114);
    expect(Array.isArray(firstChapter)).toBe(true);
    expect(Array.isArray(lastChapter)).toBe(true);
  });
});
