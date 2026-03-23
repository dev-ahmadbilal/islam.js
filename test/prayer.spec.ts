import { Prayer } from '../src';

const mockTimings = {
  Fajr: '04:13',
  Sunrise: '05:37',
  Dhuhr: '12:03',
  Asr: '15:40',
  Sunset: '18:29',
  Maghrib: '18:29',
  Isha: '19:53',
  Imsak: '04:03',
  Midnight: '00:03',
  Firstthird: '22:11',
  Lastthird: '01:54',
};

const mockApiResponse = {
  code: 200,
  status: 'OK',
  data: {
    timings: mockTimings,
    date: { readable: '30 Aug 2024', timestamp: '1724976000', gregorian: {}, hijri: {} },
    meta: {},
  },
};

describe('Prayer Class', () => {
  let prayer: Prayer;

  beforeEach(() => {
    prayer = new Prayer();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getPrayerTimesByLocation', () => {
    test('should return prayer timings for a given location', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response);

      const result = await prayer.getPrayerTimesByLocation('30-08-2024', 31.52037, 74.358749);
      expect(result).toEqual(mockTimings);
    });

    test('should include latitude and longitude in URL', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response);

      await prayer.getPrayerTimesByLocation('30-08-2024', 31.52037, 74.358749);
      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining('latitude=31.52037&longitude=74.358749'),
      );
    });

    test('should include date in URL', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response);

      await prayer.getPrayerTimesByLocation('30-08-2024', 31.52037, 74.358749);
      expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('30-08-2024'));
    });

    test('should append method parameter when provided', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response);

      await prayer.getPrayerTimesByLocation('30-08-2024', 31.52037, 74.358749, 2);
      expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('&method=2'));
    });

    test('should not append method parameter when not provided', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response);

      await prayer.getPrayerTimesByLocation('30-08-2024', 31.52037, 74.358749);
      expect(fetchSpy).not.toHaveBeenCalledWith(expect.stringContaining('&method='));
    });

    test('should throw error when fetch fails', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error',
      } as Response);

      await expect(prayer.getPrayerTimesByLocation('30-08-2024', 0, 0)).rejects.toThrow(
        'Failed to fetch prayer times',
      );
    });

    test('should throw error when network call throws', async () => {
      jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));

      await expect(prayer.getPrayerTimesByLocation('30-08-2024', 0, 0)).rejects.toThrow('Network error');
    });
  });

  describe('getPrayerTimesByCity', () => {
    test('should return prayer timings for a given city', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response);

      const result = await prayer.getPrayerTimesByCity('Dubai', 'United Arab Emirates');
      expect(result).toEqual(mockTimings);
    });

    test('should include city and country in URL', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response);

      await prayer.getPrayerTimesByCity('Dubai', 'United Arab Emirates');
      expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('city=Dubai'));
      expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('country=United%20Arab%20Emirates'));
    });

    test('should URL-encode city and country names', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response);

      await prayer.getPrayerTimesByCity('New York', 'United States');
      expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('city=New%20York'));
    });

    test('should append method parameter when provided', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      } as Response);

      await prayer.getPrayerTimesByCity('Dubai', 'UAE', 3);
      expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('&method=3'));
    });

    test('should throw error when city fetch fails', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      } as Response);

      await expect(prayer.getPrayerTimesByCity('Unknown', 'Unknown')).rejects.toThrow(
        'Failed to fetch prayer times by city',
      );
    });

    test('should throw error when network call throws', async () => {
      jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));

      await expect(prayer.getPrayerTimesByCity('Dubai', 'UAE')).rejects.toThrow('Network error');
    });
  });
});
