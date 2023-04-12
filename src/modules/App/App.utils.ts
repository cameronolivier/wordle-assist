import { type Maybe } from '~/types';

export const rulesFilter =
  (rules: string[] = []) =>
  (word: string) => {
    return rules.reduce((acc, rule) => {
      const letter = word[parseInt(rule[1]) - 1].toLowerCase();
      const condition = rule[0].toLowerCase();
      const hasPassed =
        rule[2] === '+' ? letter === condition : letter !== condition;
      return acc && hasPassed;
    }, true);
  };

export const filterWords = async (
  rules: Maybe<string[]>,
  words: Maybe<string[]>
) => {
  if (rules == null || words == null) {
    return [];
  }
  return Promise.resolve(words.filter(rulesFilter(rules)));
};

export const filterOnExcludedLetters = async (
  words: string[],
  letters: string[]
) => {
  if (letters.length === 0 || words.length === 0) return Promise.resolve(words);

  return Promise.resolve(
    words.filter((word) => {
      return letters.reduce(
        (state, letter) => !word.includes(letter) && state,
        true
      );
    })
  );
};
