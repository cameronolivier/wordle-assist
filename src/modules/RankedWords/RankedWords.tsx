import { useEffect, useState } from 'react';

import { type Maybe } from '~/types';

import { Letters } from '../App/App.utils';

interface WordCount {
  count: number;
}
type WordCounts = Record<string, WordCount>;

interface Props {
  letters: Letters;
  words: Maybe<string[]>;
  className?: string;
  isVisible?: boolean;
  onWordSelect: (word: string) => void;
}
const RankedWords = ({
  letters,
  words,
  className,
  onWordSelect,

  isVisible = false,
}: Props) => {
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

  const handleWordSelect = (word: string) => () => {
    onWordSelect(word);
  };

  return (
    <>
      <div className={className}>
        {isVisible && (
          <div className="flex flex-wrap justify-between text-left">
            {Object.keys(wordCounts).length > 0 &&
              Object.entries(wordCounts)
                .sort((a, b) => b[1].count - a[1].count)
                .slice(0, 10)
                .map((entry) => (
                  <button
                    key={entry[0]}
                    onClick={handleWordSelect(entry[0])}
                    className="m-2 rounded-md bg-slate-800 p-2"
                  >
                    <pre className="text-sm text-slate-300">
                      {entry[0]}: {entry[1].count}
                    </pre>
                  </button>
                ))}
          </div>
        )}
      </div>
    </>
  );
};

export default RankedWords;
