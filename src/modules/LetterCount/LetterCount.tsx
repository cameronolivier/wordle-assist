import { useEffect, useState } from 'react';

import Header from '~/components/Heading';
import Text from '~/components/Text';
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
              const curr = Object.prototype.hasOwnProperty.call(_letters, key)
                ? _letters[key]
                : 0;
              _letters[key] = curr + 1;
            } else {
              const curr = Object.prototype.hasOwnProperty.call(_letters, char)
                ? _letters[char]
                : 0;
              _letters[char] = curr + 1;
            }
          });
      });
      setLetters(_letters);
    }
  }, [words]);
  return (
    <div className="flex-1">
      <Header className="text-left text-3xl">Letter Counts:</Header>
      <div>
        {Object.keys(letters).length > 0 &&
          Object.entries(letters).map((entry) => (
            <pre key={entry[0]} className="text-left text-slate-300">
              {entry[0]}: {entry[1]}
            </pre>
          ))}
      </div>
    </div>
  );
};