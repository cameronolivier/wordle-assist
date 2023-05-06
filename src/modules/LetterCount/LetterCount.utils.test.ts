import * as SUT from './LetterCount.utils';

describe('LetterCount.utils', () => {
  describe('countLetters', () => {
    it('should return an object with the count of each letter', () => {
      const result = SUT.countLetters(['aabbc', 'ddabc', 'cccaa']);
      expect(result).toEqual({
        a: 3,
        aa: 2,
        b: 2,
        bb: 1,
        c: 3,
        cc: 2,
        d: 1,
        dd: 1,
      });
    });
  });
});
