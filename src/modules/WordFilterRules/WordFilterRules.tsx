import { useRef } from 'react';

import Button from '~/components/Button';
import Text from '~/components/Text';

interface Props {
  onSetFilters: (rules: string[]) => void;
  className?: string;
}

const WordFilterRules = ({ onSetFilters, className }: Props) => {
  const wordFilterRef = useRef<HTMLTextAreaElement>(null);

  const handleRules = () => {
    if (wordFilterRef.current != null && wordFilterRef.current.value) {
      const letterRules = wordFilterRef.current.value.split('\n');
      onSetFilters(letterRules);
    }
  };
  const handleReset = () => {
    if (wordFilterRef.current != null) {
      wordFilterRef.current.value = '';
      onSetFilters([]);
    }
  };

  return (
    <div className={className}>
      <Text className="text-slate-300">Included letters:</Text>
      <Text className="text-sm italic text-stone-400">
        These are the green and yellow letters in the Wordle results.
      </Text>
      <textarea
        ref={wordFilterRef}
        rows={20}
        className="mb-2 h-48 bg-slate-800 p-4 text-slate-200"
      />
      <div className="flex">
        <Button variant="secondary" onClick={handleReset}>
          Clear
        </Button>
        <Button variant="primary" onClick={handleRules}>
          Update filters
        </Button>
      </div>
      <Text className="my-2 italic text-stone-400">
        Each rule should be on a new line.
        <br />
        <strong>Format:</strong> [Letter][Position][+/-]
        <br />
        Examples:
        <br />
        If the letter A in the first spot is yellow, then enter: A1- <br />
        If the letter A in the first spot is green, then enter: A1+
      </Text>
    </div>
  );
};

export default WordFilterRules;
