import { useEffect, useState } from 'react';

import { type Maybe } from '../../types';
import { type Letters } from '../LetterCount';

interface WordCount {
  count: number;
}
type WordCounts = Record<string, WordCount>;

interface Props {
  letters: Letters;
  words: Maybe<string[]>;
}
const RankedWords = ({ letters, words }: Props) => {
  const [wordCounts, setWordCounts] = useState<WordCounts>({});

  useEffect(() => {
    if (Object.keys(letters).length > 0 && words != null && words.length > 0) {
      const _wordCounts: WordCounts = {};
      words.forEach((word) => {
        _wordCounts[word.slice(0, 5)] = {
          count: word
            .split('')
            .slice(0, 5)
            .map((letter, index) => {
              if (index > word.indexOf(letter)) {
                return `${letter}${letter}`;
              }
              return letter;
            })
            .reduce((acc, curr): number => {
              return letters[curr] + acc;
            }, 0),
        };
      });
      setWordCounts(_wordCounts);
    }
  }, [letters, words]);

  return (
    <div className="flex-1">
      <h2 className="text-3xl text-left">Results:</h2>
      <div className="text-left">
        {Object.keys(wordCounts).length > 0 &&
          Object.entries(wordCounts)
            .sort((a, b) => b[1].count - a[1].count)
            .map((entry) => (
              <p>
                <pre>
                  {entry[0]}: {entry[1].count}
                </pre>
              </p>
            ))}
      </div>
    </div>
  );
};

export default RankedWords;
