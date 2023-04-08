import { useEffect, useState } from 'react';

import { type Maybe } from '~/types';

export type Letters = Record<string, number>;

interface Props {
  words: Maybe<string[]>;
  onLettersUpdate: (letters: Letters) => void;
}
export const LetterCount = ({ words, onLettersUpdate }: Props) => {
  const [letters, setLetters] = useState<Letters>({});

  useEffect(() => {
    onLettersUpdate(letters);
  }, [letters, onLettersUpdate]);

  useEffect(() => {
    const _letters: Letters = {};
    if (words != null && words.length > 0) {
      words.forEach((word) => {
        word
          .split('')
          .slice(0, 5)
          .forEach((char, index) => {
            if (index > word.indexOf(char)) {
              const key = `${char}${char}`;
              const curr = Object.prototype.hasOwnProperty.call(_letters, key) ? _letters[key] : 0;
              _letters[key] = curr + 1;
            } else {
              const curr = Object.prototype.hasOwnProperty.call(_letters, char) ? _letters[char] : 0;
              _letters[char] = curr + 1;
            }
          });
      });
      setLetters(_letters);
    }
  }, [words]);
  return (
    <div className="flex-1">
      <h2 className="text-3xl text-left">Letter Counts:</h2>
      <div>
        {Object.keys(letters).length > 0 &&
          Object.entries(letters).map((entry) => (
            <p key={entry[0]} className="text-left">
              {entry[0]}: {entry[1]}
            </p>
          ))}
      </div>
    </div>
  );
};
