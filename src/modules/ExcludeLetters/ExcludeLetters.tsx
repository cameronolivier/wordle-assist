import { useRef } from 'react';

import Button from '~/components/Button';
import Text from '~/components/Text';
import { Maybe } from '~/types';

type Props = {
  words: Maybe<string[]>;
  onRemoveLetters: (words: Maybe<string[]>) => void;
  className?: string;
};
export default function ExcludeLetters({
  words,
  onRemoveLetters,
  className,
}: Props) {
  const excludedLetterRef = useRef<HTMLInputElement>(null);

  const handleFilterOutLetters = () => {
    if (excludedLetterRef.current != null && words) {
      const letters = excludedLetterRef.current?.value.split('');
      const newWords = words.filter((word) =>
        letters.reduce((state, letter) => !word.includes(letter) && state, true)
      );
      onRemoveLetters(newWords);
    }
  };

  const handleReset = () => {
    if (excludedLetterRef.current != null) {
      excludedLetterRef.current.value = '';
      onRemoveLetters(words);
    }
  };

  return (
    <div className={className}>
      <Text className="text-slate-300">3: Enter excluded letters:</Text>
      <input
        ref={excludedLetterRef}
        className="mb-2 w-full bg-slate-800 p-4 text-slate-200"
      />
      <div className="flex">
        <Button variant="primary" onClick={handleFilterOutLetters}>
          Update list
        </Button>
        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
