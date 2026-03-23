import { HijriCalendar } from '../src';

const mockHijriDate = {
  date: '24-02-1446',
  format: 'DD-MM-YYYY',
  day: '24',
  weekday: { en: "Al Juma'a", ar: 'الجمعة' },
  month: { number: 2, en: 'Ṣafar', ar: 'صَفَر' },
  year: '1446',
  designation: { abbreviated: 'AH', expanded: 'Anno Hegirae' },
  holidays: [],
};

const mockApiResponse = {
  code: 200,
  status: 'OK',
  data: {
    timings: {},
    date: {
      readable: '30 Aug 2024',
      timestamp: '1724976000',
      gregorian: {},
      hijri: mockHijriDate,
    },
    meta: {},
  },
};

describe('HijriCalendar Class', () => {
  let calendar: HijriCalendar;

  beforeEach(() => {
    calendar = new HijriCalendar();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getHijriDateByLocation', () => {
    test('should return Hijri date for a given location', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response);

      const result = await calendar.getHijriDateByLocation('30-08-2024', 31.52037, 74.358749);
      expect(result).toEqual(mockHijriDate);
    });

    test('should include latitude and longitude in URL', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response);

      await calendar.getHijriDateByLocation('30-08-2024', 31.52037, 74.358749);
      expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('latitude=31.52037&longitude=74.358749'));
    });

    test('should include date in URL', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response);

      await calendar.getHijriDateByLocation('30-08-2024', 31.52037, 74.358749);
      expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('30-08-2024'));
    });

    test('should append method parameter when provided', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response);

      await calendar.getHijriDateByLocation('30-08-2024', 31.52037, 74.358749, 2);
      expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('&method=2'));
    });

    test('should not include method when not provided', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response);

      await calendar.getHijriDateByLocation('30-08-2024', 31.52037, 74.358749);
      expect(fetchSpy).not.toHaveBeenCalledWith(expect.stringContaining('method='));
    });

    test('should throw error when fetch fails', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error',
      } as Response);

      await expect(calendar.getHijriDateByLocation('30-08-2024', 0, 0)).rejects.toThrow(
        'Failed to fetch Hijri date by location',
      );
    });

    test('should throw error when network call throws', async () => {
      jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));

      await expect(calendar.getHijriDateByLocation('30-08-2024', 0, 0)).rejects.toThrow('Network error');
    });

    test('should return correct hijri date properties', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response);

      const result = await calendar.getHijriDateByLocation('30-08-2024', 31.52037, 74.358749);
      expect(result).toHaveProperty('date');
      expect(result).toHaveProperty('year');
      expect(result).toHaveProperty('month');
      expect(result).toHaveProperty('day');
      expect(result).toHaveProperty('weekday');
    });
  });

  describe('getHijriDateByCity', () => {
    test('should return Hijri date for a given city', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response);

      const result = await calendar.getHijriDateByCity('Dubai', 'United Arab Emirates');
      expect(result).toEqual(mockHijriDate);
    });

    test('should include city and country in URL', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response);

      await calendar.getHijriDateByCity('Dubai', 'United Arab Emirates');
      expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('city=Dubai'));
      expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('country=United%20Arab%20Emirates'));
    });

    test('should URL-encode city and country with spaces', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response);

      await calendar.getHijriDateByCity('New York', 'United States');
      expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('city=New%20York'));
    });

    test('should append method parameter when provided', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response);

      await calendar.getHijriDateByCity('Dubai', 'UAE', 5);
      expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('&method=5'));
    });

    test('should throw error when city fetch fails', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      } as Response);

      await expect(calendar.getHijriDateByCity('Unknown', 'Unknown')).rejects.toThrow(
        'Failed to fetch Hijri date by city',
      );
    });

    test('should throw error when network call throws', async () => {
      jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));

      await expect(calendar.getHijriDateByCity('Dubai', 'UAE')).rejects.toThrow('Network error');
    });
  });
});
