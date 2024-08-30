import { Azkar, AzkarCategoriesEnum } from '../src';

describe('Azkar Class', () => {
  let azkar: Azkar;

  beforeEach(() => {
    azkar = new Azkar();
  });

  test('should return all supplications by category', async () => {
    const result = azkar.getByCategory(AzkarCategoriesEnum.Morning);
    expect(result.length).toEqual(31);
  });

  test('should return random supplication by category', async () => {
    const result = azkar.getRandomByCategory(AzkarCategoriesEnum.Anxiety);
    expect(result.category).toEqual(AzkarCategoriesEnum.Anxiety);
  });
});
