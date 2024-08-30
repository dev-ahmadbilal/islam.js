import { Hadith, HadithBook } from '../src';

describe('Hadith Class', () => {
  let hadith: Hadith;

  beforeEach(() => {
    hadith = new Hadith();
  });

  test('should return a hadith by hadith number', async () => {
    const expectedHadith = {
      metadata: {
        name: 'Sunan Abu Dawud',
        section: 'Purification (Kitab Al-Taharah)',
        sectionDetails: {
          arabicNumberFirst: 1,
          arabicNumberLast: 390,
          hadithNumberFirst: 1,
          hadithNumberLast: 390,
        },
      },
      hadith: {
        text: 'Narrated Salman al-Farsi: It was said to Salman: Your Prophet teaches you everything, even about excrement. He replied: Yes. He has forbidden us to face the qiblah at the time of easing or urinating, and cleansing with right hand, and cleansing with less than three stones, or cleansing with dung or bone',
        hadithNumber: 7,
        arabicNumber: 7,
        grades: [
          {
            name: 'Al-Albani',
            grade: 'Sahih',
          },
          {
            name: 'Muhammad Muhyi Al-Din Abdul Hamid',
            grade: 'Sahih',
          },
          {
            name: 'Shuaib Al Arnaut',
            grade: 'Sahih',
          },
          {
            name: 'Zubair Ali Zai',
            grade: 'Sahih Muslim (262)',
          },
        ],
      },
    };

    const result = await hadith.getHadith(HadithBook.AbuDawud, 7);
    expect(result).toEqual(expectedHadith);
  });
});
