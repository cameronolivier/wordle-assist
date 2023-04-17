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
