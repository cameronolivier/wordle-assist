import { useRef } from 'react';

import Button from '~/components/Button';
import Text from '~/components/Text';

type Props = {
  onRemoveLetters: (words: string[]) => void;
  className?: string;
};

export default function ExcludeLetters({ onRemoveLetters, className }: Props) {
  const excludeLettersRef = useRef<HTMLInputElement>(null);

  const handleFilterOutLetters = async () => {
    if (excludeLettersRef.current != null) {
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
      <Text className="text-slate-300">3: Enter excluded letters:</Text>
      <input
        ref={excludeLettersRef}
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
