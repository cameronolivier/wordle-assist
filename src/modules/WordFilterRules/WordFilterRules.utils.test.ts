import * as SUT from './WordFilterRules.utils';

describe('WordFilterRules.utils', () => {
  describe('rulesFilter', () => {
    test.each([
      { word: 'abysm', expected: false },
      { word: 'chasm', expected: true },
      { word: 'flask', expected: true },
      { word: 'caffs', expected: false },
      { word: 'chaws', expected: false },
    ])('should filter %s by the provided rules', ({ word, expected }) => {
      // given ...
      const rules = ['a1-', 's4+'];

      // when ...

      const result = SUT.rulesFilter(rules)(word);
      // then ... should filter a given word by the provided rules
      expect(result).toBe(expected);
    });
  });
  describe('filterWords', () => {
    it('should correctly filter out words based on the provided rules', () => {
      // given ... a list of words
      const wordsMock = [
        'abysm',
        'chasm',
        'flask',
        'awash',
        'flash',
        'hawse',
        'swash',
        'abash',
        'akkas',
        'backs',
        'caffs',
        'chaws',
        'dhaks',
        'gawks',
      ];

      const rules = ['a1-', 'S4+'];
      // when ...
      const result = SUT.filterWords(rules, wordsMock);
      // then ...
      expect(result).toEqual(['chasm', 'flask', 'flash', 'hawse', 'swash']);
    });
    it('should return an empty array if no data is passed in', () => {
      const result = SUT.filterWords(undefined, undefined);
      expect(result).toEqual([]);
    });
  });
});
