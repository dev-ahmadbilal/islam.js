import {
  mapHadithInfoResponse,
  mapHadithEditionResponse,
  mapHadithSectionResponse,
  mapHadithResponse,
} from '../src/hadith/hadith-response-mappers';
import { HadithApiResponse, HadithEditionApiResponse, HadithInfoApiResponse } from '../src/types/hadith-api-response';

const mockHadithApiResponse: HadithApiResponse = {
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
      text: 'Narrated Salman al-Farsi: Some hadith text',
      grades: [{ name: 'Al-Albani', grade: 'Sahih' }],
      reference: [{ book: 1, hadith: 7 }],
    },
  ],
};

const mockEditionApiResponse: HadithEditionApiResponse = {
  hadiths: [
    {
      grades: [{ name: 'Al-Albani', grade: 'Sahih' }],
      hadithnumber: 1,
      reference: { book: 1, hadith: 1 },
      text: 'First hadith text',
    },
    {
      grades: [],
      hadithnumber: 2,
      reference: { book: 1, hadith: 2 },
      text: 'Second hadith text',
    },
  ] as any,
  metadata: {
    last_hadithnumber: 390,
    name: 'Sunan Abu Dawud',
    section_details: [{ 1: { arabicnumber_first: 1, arabicnumber_last: 390, hadithnumber_first: 1, hadithnumber_last: 390 } }] as any,
    sections: [{ 1: 'Purification' }] as any,
  },
};

const mockInfoApiResponse: HadithInfoApiResponse = {
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
      section_details: [{ 1: { arabicnumber_first: 1, arabicnumber_last: 390, hadithnumber_first: 1, hadithnumber_last: 390 } }] as any,
      sections: [{ 1: 'Purification' }] as any,
    },
  },
};

describe('Hadith Response Mappers', () => {
  describe('mapHadithResponse', () => {
    test('should map hadith API response correctly', () => {
      const result = mapHadithResponse(mockHadithApiResponse);

      expect(result.metadata.name).toBe('Sunan Abu Dawud');
      expect(result.metadata.section).toBe('Purification (Kitab Al-Taharah)');
      expect(result.metadata.sectionDetails.arabicNumberFirst).toBe(1);
      expect(result.metadata.sectionDetails.arabicNumberLast).toBe(390);
      expect(result.metadata.sectionDetails.hadithNumberFirst).toBe(1);
      expect(result.metadata.sectionDetails.hadithNumberLast).toBe(390);
    });

    test('should map hadith content correctly', () => {
      const result = mapHadithResponse(mockHadithApiResponse);

      expect(result.hadith.hadithNumber).toBe(7);
      expect(result.hadith.arabicNumber).toBe(7);
      expect(result.hadith.text).toContain('Narrated Salman al-Farsi');
      expect(result.hadith.grades).toEqual([{ name: 'Al-Albani', grade: 'Sahih' }]);
    });

    test('should return an object with metadata and hadith keys', () => {
      const result = mapHadithResponse(mockHadithApiResponse);
      expect(result).toHaveProperty('metadata');
      expect(result).toHaveProperty('hadith');
    });
  });

  describe('mapHadithSectionResponse', () => {
    test('should map section response correctly', () => {
      const result = mapHadithSectionResponse(mockHadithApiResponse, 1);

      expect(result.metadata.name).toBe('Sunan Abu Dawud');
      expect(result.metadata.section).toBe('Purification (Kitab Al-Taharah)');
      expect(result.metadata.sectionDetails.arabicNumberFirst).toBe(1);
      expect(result.metadata.sectionDetails.arabicNumberLast).toBe(390);
    });

    test('should map hadiths array correctly', () => {
      const result = mapHadithSectionResponse(mockHadithApiResponse, 1);

      expect(Array.isArray(result.hadiths)).toBe(true);
      expect(result.hadiths).toHaveLength(1);
      expect(result.hadiths[0].hadithNumber).toBe(7);
      expect(result.hadiths[0].arabicNumber).toBe(7);
      expect(result.hadiths[0].text).toContain('Narrated Salman al-Farsi');
    });

    test('should include grades and reference in hadiths', () => {
      const result = mapHadithSectionResponse(mockHadithApiResponse, 1);
      expect(result.hadiths[0].grades).toEqual([{ name: 'Al-Albani', grade: 'Sahih' }]);
      expect(result.hadiths[0].reference).toEqual([{ book: 1, hadith: 7 }]);
    });
  });

  describe('mapHadithEditionResponse', () => {
    test('should map edition response with all hadiths', () => {
      const result = mapHadithEditionResponse(mockEditionApiResponse);

      expect(result).toHaveProperty('metadata');
      expect(result).toHaveProperty('hadiths');
      expect(result.hadiths).toHaveLength(2);
    });

    test('should map metadata correctly', () => {
      const result = mapHadithEditionResponse(mockEditionApiResponse);

      expect(result.metadata.name).toBe('Sunan Abu Dawud');
      expect(Array.isArray(result.metadata.sections)).toBe(true);
    });

    test('should map individual hadith fields correctly', () => {
      const result = mapHadithEditionResponse(mockEditionApiResponse);

      expect(result.hadiths[0].hadithNumber).toBe(1);
      expect(result.hadiths[0].text).toBe('First hadith text');
      expect(result.hadiths[0].grades).toEqual([{ name: 'Al-Albani', grade: 'Sahih' }]);
    });
  });

  describe('mapHadithInfoResponse', () => {
    test('should map info response with book key', () => {
      const result = mapHadithInfoResponse(mockInfoApiResponse);

      expect(result).toHaveProperty('abu-dawud');
    });

    test('should map metadata for each book', () => {
      const result = mapHadithInfoResponse(mockInfoApiResponse);

      expect(result['abu-dawud'].metadata.name).toBe('Sunan Abu Dawud');
      expect(result['abu-dawud'].metadata.lastHadithNumber).toBe(390);
    });

    test('should map hadiths for each book', () => {
      const result = mapHadithInfoResponse(mockInfoApiResponse);

      expect(Array.isArray(result['abu-dawud'].hadiths)).toBe(true);
      expect(result['abu-dawud'].hadiths).toHaveLength(1);
    });

    test('should handle multiple books', () => {
      const multiBookResponse: HadithInfoApiResponse = {
        ...mockInfoApiResponse,
        bukhari: {
          hadiths: [
            {
              arabicnumber: 1,
              grades: [],
              hadithnumber: 1,
              reference: { book: 1, hadith: 1 },
            },
          ],
          metadata: {
            last_hadithnumber: 7563,
            name: 'Sahih al Bukhari',
            section_details: [{ 1: { arabicnumber_first: 1, arabicnumber_last: 100, hadithnumber_first: 1, hadithnumber_last: 100 } }] as any,
            sections: [{ 1: 'Revelation' }] as any,
          },
        },
      };

      const result = mapHadithInfoResponse(multiBookResponse);
      expect(result).toHaveProperty('abu-dawud');
      expect(result).toHaveProperty('bukhari');
      expect(result['bukhari'].metadata.name).toBe('Sahih al Bukhari');
    });
  });
});
