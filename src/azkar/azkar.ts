import { AzkarCollection, AzkarCollectionType } from '../assets/azkar-collection';
import { AzkarCategoriesEnum } from '../types/azkar-categories.enum';
import { Zikr } from '../types/zikr';

export class Azkar {
  private azkarCollection: AzkarCollectionType;

  constructor() {
    this.azkarCollection = AzkarCollection;
  }

  /**
   * Get a category from the categories
   * @param {AzkarCategoriesEnum} category - Category enum or string key
   * @returns Zikr[] - List of azkars in the category or undefined
   */
  public getByCategory(category: AzkarCategoriesEnum): Zikr[] {
    return this.azkarCollection[category];
  }

  /**
   * Get a random azkar from a specific category or overall
   * @param {object} input - Input object containing category
   * @returns {Zikr} - Random azkar
   * @throws {Error} - If category is not found
   */
  public getRandomByCategory(category: AzkarCategoriesEnum): Zikr {
    const categoryList = this.getByCategory(category);
    return this.randomValueFromArray(categoryList);
  }

  /**
   * Get all azkars
   * @returns {Map<string, Zikr[]>} - Map of all azkars by category
   */
  public getAll(): Map<string, Zikr[]> {
    return new Map(Object.entries(this.azkarCollection));
  }

  /**
   * Get a random azkar
   * @returns {Zikr} - Random azkar
   */
  public getRandom(): Zikr {
    const allAzkars = Object.values(this.azkarCollection).flat();
    return this.randomValueFromArray(allAzkars);
  }

  /**
   * Get a random value from an array
   * @param {Zikr[]} array - Array of Zikr items
   * @returns {Zikr} - Random Zikr
   */
  private randomValueFromArray(array: Zikr[]): Zikr {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
}
