import { describe } from 'vitest';

import { filterFn } from './App.utils';
import * as SUT from './App.utils';

describe('WordFilterRules.utils', () => {
  describe('filterWordOnLetterRules', () => {
    it('should return true if no letters are provided', () => {
      // given ... a word
      const wordMock = 'abysm';
      // and ... a list of letters
      const lettersMock: string[] = [];
      // when ... we filter out the word based on the provided letters
      const result = SUT.filterWordOnLetterRules(lettersMock)(wordMock);
      // then ... we should get back true
      expect(result).toBe(true);
    });
    it.each([
      [['a1+', 'b2+', 'y3+', 's4+', 'm5+'], true],
      [['a1+', 'b3-'], true],
    ])(
      'should return true if the word satisfies the provided rules',
      (rules, expected) => {
        // given ... a word
        const wordMock = 'abysm';
        // and ... a list of letter rules
        // when ... we filter out the word based on the provided letters
        const result = SUT.filterWordOnLetterRules(rules)(wordMock);
        // then ... we should get back true
        expect(result).toBe(expected);
      }
    );
    it.each([
      [['a1+', 'b3+', 'y2-'], false],
      [['a2+'], false],
      [['s4-'], false],
    ])(
      'should return false if the word does not satisfy the provided rules',
      (rules, expected) => {
        // given ... a word
        const wordMock = 'abysm';
        // and ... a list of letter rules
        // when ... we filter out the word based on the provided letters
        const result = SUT.filterWordOnLetterRules(rules)(wordMock);
        // then ... we should get back false
        expect(result).toBe(expected);
      }
    );
    it('should return false if the word does not contain any of the provided letters', () => {
      // given ... a word
      const wordMock = 'abysm';
      // and ... a list of letters
      const lettersMock = ['z', 'x'];
      // when ... we filter out the word based on the provided letters
      const result = SUT.filterWordOnLetterRules(lettersMock)(wordMock);
      // then ... we should get back false
      expect(result).toBe(false);
    });
    it('should return true if the word contains all of the provided letters', () => {
      // given ... a word
      const wordMock = 'abysm';
      // and ... a list of letters
      const lettersMock = ['a6='];
      // when ... we filter out the word based on the provided letters
      const result = SUT.filterWordOnLetterRules(lettersMock)(wordMock);
      // then ... we should get back true
      expect(result).toBe(true);
    });
  });

  describe('filterIncludedLetters', () => {
    it('should return the original list if no letters are provided', () => {
      // given ... a list of words
      const wordsMock = ['abysm', 'chasm', 'fleet', 'clerk'];
      // and ... a list of letters
      const lettersMock: string[] = [];
      // when ... we filter out the words that have any of the provided letters
      const result = SUT.filterIncludedLetters(lettersMock)(wordsMock);
      // then ... we should get back the original list
      expect(result).toEqual(wordsMock);
    });
    it('should include all words that match the provided rules', () => {
      // given ... a list of words
      const wordsMock = ['abysm', 'chasm', 'fleet', 'clerk'];
      // and ... a list of letters
      const lettersMock = ['A2-', 'm5+'];
      // when ... we filter out the words that have any of the provided letters
      const result = SUT.filterIncludedLetters(lettersMock)(wordsMock);
      // then ... we should get back the original list
      expect(result).toEqual(['abysm', 'chasm']);
    });
  });

  describe('filterRemoveLetters', () => {
    it('should remove any words that have any of the provided letters', () => {
      // given ... a list of words
      const wordsMock = ['abysm', 'chasm', 'fleet', 'clerk'];
      // and ... a list of letters
      const lettersMock = ['a', 'b'];
      // when ... we filter out the words that have any of the provided letters
      const result = SUT.filterRemovedLetters(lettersMock)(wordsMock);
      // then ... we should get back a list of words that do not have any of the provided letters
      expect(result).toEqual(['fleet', 'clerk']);
    });
    it('should return the original list if no letters are provided', () => {
      // given ... a list of words
      const wordsMock = ['abysm', 'chasm', 'fleet', 'clerk'];
      // and ... a list of letters
      const lettersMock: string[] = [];
      // when ... we filter out the words that have any of the provided letters
      const result = SUT.filterRemovedLetters(lettersMock)(wordsMock);
      // then ... we should get back a list of words that do not have any of the provided letters
      expect(result).toEqual(wordsMock);
    });
    it('should not remove words if no provided letters are in the word', () => {
      // given ... a list of words
      const wordsMock = ['abysm', 'chasm', 'fleet', 'clerk'];
      // and ... a list of letters
      const lettersMock = ['z', 'x'];
      // when ... we filter out the words that have any of the provided letters
      const result = SUT.filterRemovedLetters(lettersMock)(wordsMock);
      // then ... we should get back a list of words that do not have any of the provided letters
      expect(result).toEqual(wordsMock);
    });
  });

  describe('filterWords', () => {
    it('should return the original list if no rules are provided', () => {
      // given ... a list of words
      const wordsMock = ['abysm', 'chasm', 'fleet', 'clerk'];
      // and ... a list of rules
      const rulesMock: filterFn[] = [];
      // when ... we filter out the words based on the provided rules
      const result = SUT.filterWords(rulesMock)(wordsMock);
      // then ... we should get back the original list
      expect(result).toEqual(wordsMock);
    });
    it('should correctly filter the words by the provided filter functions', () => {
      // given ... a list of words
      const wordsMock = ['abysm', 'chasm', 'chafe', 'clerk'];
      // and ... a list of rules
      const rulesMock: filterFn[] = [
        SUT.filterIncludedLetters(['a3+']),
        SUT.filterRemovedLetters(['e']),
      ];
      // when ... we filter out the words based on the provided rules
      const result = SUT.filterWords(rulesMock)(wordsMock);
      // then ... we should get back the original list
      expect(result).toEqual(['chasm']);
    });
  });
});
