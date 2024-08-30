import { Quran } from '../src';

describe.skip('index', () => {
  describe('myPackage', () => {
    it('should return a string containing the message', () => {
      const message = 'Hello';

      const result = new Quran();

      expect(result).toMatch(message);
    });
  });
});
