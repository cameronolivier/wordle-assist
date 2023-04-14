export const filterWordOnLetterRules =
  (letterRules: string[]) =>
  (word: string): boolean => {
    if (letterRules.length === 0) return true;

    return letterRules.every((rule) => {
      const [char, pos, state] = rule.split('');
      const charIndex = parseInt(pos, 10) - 1;
      const safeWord = word.toLowerCase();
      const safeChar = char.toLowerCase();

      if (!safeWord.includes(safeChar)) {
        return false;
      }

      if (state === '+') {
        return safeWord[charIndex] === safeChar;
      }

      if (state === '-') {
        return safeWord[charIndex] !== safeChar;
      }

      return true;
    });
  };

export const filterIncludedLetters =
  (letterRules: string[]) => (words: string[]) => {
    if (letterRules.length === 0 || words.length === 0) return words;

    return words.filter(filterWordOnLetterRules(letterRules));
  };

export const filterRemovedLetters =
  (letters: string[]) =>
  (words: string[]): string[] => {
    if (letters.length === 0 || words.length === 0) return words;

    return words.filter((word) =>
      letters.every(
        (letter) => !word.toLowerCase().includes(letter.toLowerCase())
      )
    );
  };

export type filterFn = (words: string[]) => string[];
export const filterWords = (filters: filterFn[]) => (words: string[]) => {
  if (words.length === 0 || filters.length === 0) {
    return words;
  }
  return filters.reduce(
    (filtered: string[], filter: filterFn) => filter(filtered),
    words
  );
};

export type Letters = Record<string, number>;

export const countLetters = (words: string[]): Letters => {
  if (words.length === 0) {
    return {};
  }
  const letterCounts = words.flatMap((word) =>
    word
      .split('')
      .slice(0, 5)
      .map((char, index) =>
        index > word.indexOf(char) ? `${char}${char}` : char
      )
  );

  return Array.from(new Set(letterCounts)).reduce<Letters>((acc, char) => {
    acc[char] = letterCounts.filter((c) => c === char).length;
    return acc;
  }, {});
};
