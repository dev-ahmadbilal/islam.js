import { Hadith, HadithBook, HadithLangEnum } from '../src';

const mockHadithApiResponse = {
  metadata: {
    name: 'Sunan Abu Dawud',
    section: { 1: 'Purification (Kitab Al-Taharah)' },
    section_detail: {
      1: {
        arabicnumber_first: 1,
        arabicnumber_last: 390,
        hadithnumber_first: 1,
        hadithnumber_last: 390,
      },
    },
  },
  hadiths: [
    {
      hadithnumber: 7,
      arabicnumber: 7,
      text: 'Narrated Salman al-Farsi: It was said to Salman: Your Prophet teaches you everything, even about excrement. He replied: Yes. He has forbidden us to face the qiblah at the time of easing or urinating, and cleansing with right hand, and cleansing with less than three stones, or cleansing with dung or bone',
      grades: [
        { name: 'Al-Albani', grade: 'Sahih' },
        { name: 'Muhammad Muhyi Al-Din Abdul Hamid', grade: 'Sahih' },
        { name: 'Shuaib Al Arnaut', grade: 'Sahih' },
        { name: 'Zubair Ali Zai', grade: 'Sahih Muslim (262)' },
      ],
      reference: [{ book: 1, hadith: 7 }],
    },
  ],
};

const mockEditionApiResponse = {
  hadiths: [
    {
      grades: [{ name: 'Al-Albani', grade: 'Sahih' }],
      hadithnumber: 1,
      reference: { book: 1, hadith: 1 },
      text: 'First hadith text',
    },
  ],
  metadata: {
    last_hadithnumber: 390,
    name: 'Sunan Abu Dawud',
    section_details: [{ 1: { arabicnumber_first: 1, arabicnumber_last: 390, hadithnumber_first: 1, hadithnumber_last: 390 } }],
    sections: [{ 1: 'Purification' }],
  },
};

const mockInfoApiResponse = {
  'abu-dawud': {
    hadiths: [
      {
        arabicnumber: 1,
        grades: [{ name: 'Al-Albani', grade: 'Sahih' }],
        hadithnumber: 1,
        reference: { book: 1, hadith: 1 },
      },
    ],
    metadata: {
      last_hadithnumber: 390,
      name: 'Sunan Abu Dawud',
      section_details: [{ 1: { arabicnumber_first: 1, arabicnumber_last: 390, hadithnumber_first: 1, hadithnumber_last: 390 } }],
      sections: [{ 1: 'Purification' }],
    },
  },
};

describe('Hadith Class', () => {
  let hadith: Hadith;

  beforeEach(() => {
    hadith = new Hadith();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should return a hadith by hadith number', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockHadithApiResponse,
    } as Response);

    const result = await hadith.getHadith(HadithBook.AbuDawud, 7);
    expect(result).toMatchObject({
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
        hadithNumber: 7,
        arabicNumber: 7,
      },
    });
    expect(result.hadith.text).toContain('Narrated Salman al-Farsi');
  });

  test('should fetch hadith with correct URL', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockHadithApiResponse,
    } as Response);

    await hadith.getHadith(HadithBook.AbuDawud, 5);
    expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('abudawud'));
    expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('/5.json'));
  });

  test('should fetch hadith in specified language', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockHadithApiResponse,
    } as Response);

    await hadith.getHadith(HadithBook.AbuDawud, 7, HadithLangEnum.English);
    expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('eng-'));
  });

  test('should return a hadith section', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockHadithApiResponse,
    } as Response);

    const result = await hadith.getSection(HadithBook.AbuDawud, 1);
    expect(result).toHaveProperty('metadata');
    expect(result).toHaveProperty('hadiths');
    expect(result.metadata.name).toBe('Sunan Abu Dawud');
    expect(result.metadata.section).toBe('Purification (Kitab Al-Taharah)');
    expect(Array.isArray(result.hadiths)).toBe(true);
  });

  test('should include section number in URL when fetching section', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockHadithApiResponse,
    } as Response);

    await hadith.getSection(HadithBook.AbuDawud, 1);
    expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('/sections/1.json'));
  });

  test('should return edition for a book', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockEditionApiResponse,
    } as Response);

    const result = await hadith.getEdition(HadithBook.AbuDawud);
    expect(result).toHaveProperty('metadata');
    expect(result).toHaveProperty('hadiths');
    expect(result.metadata.name).toBe('Sunan Abu Dawud');
  });

  test('should return books info', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockInfoApiResponse,
    } as Response);

    const result = await hadith.getBooksInfo();
    expect(result).toHaveProperty('abu-dawud');
    expect(result['abu-dawud'].metadata.name).toBe('Sunan Abu Dawud');
  });

  test('should fetch from info.json URL for getBooksInfo', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockInfoApiResponse,
    } as Response);

    await hadith.getBooksInfo();
    expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('info.json'));
  });

  test('should throw error when fetch fails', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    } as Response);

    await expect(hadith.getHadith(HadithBook.AbuDawud, 999)).rejects.toThrow('Failed to fetch data');
  });

  test('should throw error when network call fails', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));

    await expect(hadith.getBooksInfo()).rejects.toThrow('Network error');
  });
});
