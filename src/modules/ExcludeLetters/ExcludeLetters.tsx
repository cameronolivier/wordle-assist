import { useRef } from 'react';

import Button from '~/components/Button';
import Text from '~/components/Text';

import Header from '../../components/Heading';

type Props = {
  onRemoveLetters: (words: string[]) => void;
  className?: string;
};

export default function ExcludeLetters({ onRemoveLetters, className }: Props) {
  const excludeLettersRef = useRef<HTMLInputElement>(null);

  const handleFilterOutLetters = async () => {
    if (excludeLettersRef.current != null && excludeLettersRef.current.value) {
      const letters = excludeLettersRef.current?.value.split('');
      onRemoveLetters(letters);
    }
  };

  const handleReset = () => {
    if (excludeLettersRef.current != null) {
      excludeLettersRef.current.value = '';
      onRemoveLetters([]);
    }
  };

  return (
    <div className={className}>
      <Header size="h3">Excluded letters:</Header>
      <Text className="text-sm italic text-stone-400">
        These are the greyed out letters in the Wordle results.
      </Text>
      <input
        ref={excludeLettersRef}
        className="w-full bg-slate-800 p-4 text-slate-200"
      />
      <div className="mt-4 flex">
        <Button variant="secondary" onClick={handleReset}>
          Clear
        </Button>
        <Button variant="primary" onClick={handleFilterOutLetters}>
          Update filters
        </Button>
      </div>
      <Text className="my-2 italic text-stone-400">
        <strong>Format:</strong> [Letter][Letter][Letter]
        <br />
        EG: if the letters A, B, and C are greyed out, then enter: ABC
      </Text>
    </div>
  );
}
