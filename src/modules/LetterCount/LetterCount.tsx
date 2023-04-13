import { useEffect, useMemo } from 'react';

import Header from '~/components/Heading';

import { countLetters, Letters } from '../App/App.utils';

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
      <div className="flex-1">
        <Header className="text-left text-3xl">Letter Counts:</Header>
        {isVisible && (
          <div>
            {Object.keys(letters).length > 0 &&
              Object.entries(letters).map((entry) => (
                <pre key={entry[0]} className="text-left text-slate-300">
                  {entry[0]}: {entry[1]}
                </pre>
              ))}
          </div>
        )}
      </div>
    </>
  );
};
