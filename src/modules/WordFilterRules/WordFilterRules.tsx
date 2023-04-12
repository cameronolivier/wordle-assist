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
    if (wordFilterRef.current != null) {
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
      <Text>2: Enter green and yellow letters:</Text>
      <Text className="my-2 italic text-stone-400">
        <strong>Format:</strong> [Letter][Position][+/-]
        <br />
        Denote <strong>placed letters </strong> with a <strong>+</strong>.
        <br />
        Denote <strong>incorrectly placed letters </strong> with a{' '}
        <strong>-</strong>.
      </Text>

      <textarea
        ref={wordFilterRef}
        rows={20}
        className="mb-2 h-48 bg-slate-800 p-4 text-slate-200"
      />
      <div className="flex">
        <Button variant="primary" onClick={handleRules}>
          Filter List
        </Button>
        <Button variant="secondary" onClick={handleReset}>
          Clear
        </Button>
      </div>

      <Text className="my-2 italic text-stone-400">
        EG: if the letter A in the first spot is yellow, then enter: A1-
      </Text>
    </div>
  );
};

export default WordFilterRules;
