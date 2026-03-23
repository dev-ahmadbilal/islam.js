import { Azkar, AzkarCategoriesEnum } from '../src';

describe('Azkar Class', () => {
  let azkar: Azkar;

  beforeEach(() => {
    azkar = new Azkar();
  });

  test('should return all supplications by category', () => {
    const result = azkar.getByCategory(AzkarCategoriesEnum.Morning);
    expect(result.length).toEqual(31);
  });

  test('should return random supplication by category', () => {
    const result = azkar.getRandomByCategory(AzkarCategoriesEnum.Anxiety);
    expect(result.category).toEqual(AzkarCategoriesEnum.Anxiety);
  });

  test('should return a random supplication from any category', () => {
    const result = azkar.getRandom();
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('zikr');
    expect(result).toHaveProperty('category');
    expect(typeof result.id).toBe('number');
    expect(typeof result.zikr).toBe('string');
  });

  test('should return all azkars as a Map', () => {
    const result = azkar.getAll();
    expect(result).toBeInstanceOf(Map);
    expect(result.size).toBeGreaterThan(0);
  });

  test('getAll should contain the Morning category', () => {
    const result = azkar.getAll();
    expect(result.has(AzkarCategoriesEnum.Morning)).toBe(true);
  });

  test('getAll categories should each contain an array of Zikr items', () => {
    const result = azkar.getAll();
    result.forEach((items) => {
      expect(Array.isArray(items)).toBe(true);
      items.forEach((item) => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('zikr');
        expect(item).toHaveProperty('category');
      });
    });
  });

  test('getRandomByCategory should return a zikr with matching category', () => {
    const result = azkar.getRandomByCategory(AzkarCategoriesEnum.Morning);
    expect(result.category).toEqual(AzkarCategoriesEnum.Morning);
  });

  test('getRandom multiple calls should return valid zikr objects', () => {
    for (let i = 0; i < 5; i++) {
      const result = azkar.getRandom();
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('zikr');
      expect(result).toHaveProperty('category');
    }
  });
});
