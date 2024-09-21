import { useEffect, useMemo, useState } from 'react';

import Typography from '../../components/Typography';
import { tw } from '../../utils/tailwind.utils';
import { countLetters, Letters } from '../LetterCount/LetterCount.utils';
import { sortByLikelyPlural } from '../App/App.utils';

const rankWords = (letters: Letters, words: string[]) => {
  const wordCounts: WordCounts = {};
  words.forEach((word) => {
    wordCounts[word.slice(0, 5)] = {
      count: Math.floor(
        (word
          .slice(0, 5)
          .split('')
          .map((letter, index) => {
            if (index > word.indexOf(letter)) {
              return `${letter}${letter}`;
            }
            return letter;
          })
          .reduce((count, char): number => {
            return letters[char] + count;
          }, 0) /
          words.length) *
          100
      ),
    };
  });
  return wordCounts;
};

interface WordCount {
  count: number;
}
type WordCounts = Record<string, WordCount>;

const MAX_WORDS_IN_SUGGESTED_LIST = 48;

interface Props {
  words: string[];
  className?: string;
  isVisible?: boolean;
  onWordSelect: (word: string) => void;
}
const RankedWords = ({
  words,
  className,
  onWordSelect,
  isVisible = true,
}: Props) => {
  const [wordCounts, setWordCounts] = useState<WordCounts>({});
  const letters = useMemo(() => {
    return countLetters(words);
  }, [words]);

  useEffect(() => {
    if (Object.keys(letters).length > 0 && words.length > 0) {
      const _wordCounts = rankWords(letters, words);
      setWordCounts(_wordCounts);
    }
  }, [letters, words]);

  const handleWordSelect = (word: string) => () => {
    onWordSelect(word);
  };

  return (
    <>
      <div className={tw(className)}>
        {isVisible && (
          <div className="mt-4 flex flex-wrap justify-between text-left">
            {Object.keys(wordCounts).length > 0 &&
              Object.entries(wordCounts)
                .sort((a, b) => b[1].count - a[1].count)
                .slice(0, MAX_WORDS_IN_SUGGESTED_LIST)
                .map((entry) => (
                  <button
                    key={entry[0]}
                    onClick={handleWordSelect(entry[0])}
                    className="mx-1 my-1.5 rounded-md bg-slate-800 p-2"
                  >
                    <pre className="text-sm text-slate-300">
                      {entry[0]}: {entry[1].count}
                    </pre>
                  </button>
                ))}
          </div>
        )}
        {words && words.length === 0 && (
          <Typography className="text-slate-500">
            No applicable words. Updating filters should provide more choices.
          </Typography>
        )}
      </div>
    </>
  );
};

export default RankedWords;
