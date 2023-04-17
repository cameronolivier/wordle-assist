import { useEffect, useMemo } from 'react';

import Header from '~/components/Heading';

import { countLetters, Letters } from './LetterCount.utils';

interface Props {
  words: string[];
  isVisible?: boolean;
  onLettersUpdate: (letters: Letters) => void;
}
export const LetterCount = ({
  words,
  onLettersUpdate,
  isVisible = false,
}: Props) => {
  const letters = useMemo(() => {
    return countLetters(words);
  }, [words]);

  useEffect(() => {
    onLettersUpdate(letters);
  }, [letters, onLettersUpdate]);

  return (
    <>
      {isVisible && (
        <div className="flex-1">
          <Header size="h3">Letter Counts:</Header>
          <div>
            {Object.keys(letters).length > 0 &&
              Object.entries(letters).map((entry) => (
                <pre key={entry[0]} className="text-left text-slate-300">
                  {entry[0]}: {entry[1]}
                </pre>
              ))}
          </div>
        </div>
      )}
    </>
  );
};
