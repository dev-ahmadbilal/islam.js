import { Quran } from '../src';

describe('Quran Class', () => {
  let quran: Quran;

  beforeEach(() => {
    quran = new Quran();
  });

  test('should return the correct chapter by index', () => {
    const chapterIndex = 108;
    const expectedChapter = {
      name: 'الكوثر',
      type: 'مكيّة',
      englishName: 'Al-Kawthar',
      number: 108,
      numberOfLetters: 42,
      numberOfVerses: 3,
      numberOfWords: 10,
      verses: ['إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ', 'فَصَلِّ لِرَبِّكَ وَانْحَرْ', 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ'],
    };

    const result = quran.getChapterByIndex(chapterIndex);
    expect(result).toEqual(expectedChapter);
  });

  test('should return the correct chapter by name', () => {
    const chapterName = 'Al-Ekhlas';
    const expectedChapter = {
      name: 'الإخلاص',
      type: 'مكيّة',
      englishName: 'Al-Ekhlas',
      number: 112,
      numberOfLetters: 47,
      numberOfVerses: 4,
      numberOfWords: 15,
      verses: [
        'قُلْ هُوَ اللَّهُ أَحَدٌ',
        'اللَّهُ الصَّمَدُ',
        'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
      ],
    };

    const result = quran.getChapterByName(chapterName);
    expect(result).toEqual(expectedChapter);
  });

  test('should return a verse by chapterNo and verseNo', () => {
    const expectedVerse = 'وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ';
    const result = quran.getVerse(21, 107);
    expect(result).toEqual(expectedVerse);
  });
});
