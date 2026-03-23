import { Tafseer, TafseerEnum } from '../src';

describe('Tafseer Class', () => {
  let tafseer: Tafseer;

  beforeEach(() => {
    tafseer = new Tafseer();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getVerseTafseer', () => {
    test('should return tafseer for a verse', async () => {
      const mockData = { ayah: 1, text: 'This is the tafseer for verse 1' };
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const result = await tafseer.getVerseTafseer(1, 1);
      expect(result).toEqual({ verseNo: 1, tafseer: 'This is the tafseer for verse 1' });
    });

    test('should use default tafseer enum when not specified', async () => {
      const mockData = { ayah: 107, text: 'Default tafseer text' };
      const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      await tafseer.getVerseTafseer(21, 107);
      expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining(TafseerEnum.TazkirulQuranEnglish));
    });

    test('should use specified tafseer enum', async () => {
      const mockData = { ayah: 1, text: 'Ibn Kathir tafseer text' };
      const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      await tafseer.getVerseTafseer(1, 1, TafseerEnum.TafsirIbnKathir);
      expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining(TafseerEnum.TafsirIbnKathir));
    });

    test('should include chapter and verse numbers in URL', async () => {
      const mockData = { ayah: 39, text: 'Tafseer text' };
      const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      await tafseer.getVerseTafseer(53, 39);
      expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('/53/39.json'));
    });

    test('should throw error when fetch fails', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      } as Response);

      await expect(tafseer.getVerseTafseer(1, 1)).rejects.toThrow('Failed to fetch tafseer for Chapter 1, Verse 1');
    });
  });

  describe('getChapterTafseer', () => {
    test('should return tafseer for all verses in a chapter', async () => {
      const mockData = {
        ayahs: [
          { ayah: 1, text: 'Tafseer for verse 1' },
          { ayah: 2, text: 'Tafseer for verse 2' },
          { ayah: 3, text: 'Tafseer for verse 3' },
        ],
      };
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const result = await tafseer.getChapterTafseer(108);
      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({ verseNo: 1, tafseer: 'Tafseer for verse 1' });
      expect(result[2]).toEqual({ verseNo: 3, tafseer: 'Tafseer for verse 3' });
    });

    test('should use default tafseer enum for chapter', async () => {
      const mockData = { ayahs: [{ ayah: 1, text: 'text' }] };
      const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      await tafseer.getChapterTafseer(1);
      expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining(TafseerEnum.TazkirulQuranEnglish));
    });

    test('should include chapter number in URL', async () => {
      const mockData = { ayahs: [{ ayah: 1, text: 'text' }] };
      const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      await tafseer.getChapterTafseer(112);
      expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('/112.json'));
    });

    test('should throw error when chapter tafseer fetch fails', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      } as Response);

      await expect(tafseer.getChapterTafseer(1)).rejects.toThrow('Failed to fetch tafseer for Chapter 1');
    });
  });
});
