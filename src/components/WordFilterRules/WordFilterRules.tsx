import { useEffect, useRef, useState } from 'react';

import Button from '~/components/Button';
import Text from '~/components/Text';
import { type Maybe } from '~/types';

import { filterWords } from './WordFilterRules.utils';

interface Props {
  words: Maybe<string[]>;
  onFilterUpdate: (words: Maybe<string[]>) => void;
}

const WordFilterRules = ({ words, onFilterUpdate }: Props) => {
  const wordFilterRef = useRef<HTMLTextAreaElement>(null);
  const [rules, setRules] = useState<string[]>([]);

  useEffect(() => {
    if (rules && words != null) {
      const wordsFiltered = filterWords(rules, words);
      onFilterUpdate(wordsFiltered);
    }
  }, [onFilterUpdate, rules, words]);

  const handleRules = () => {
    if (wordFilterRef.current != null) {
      const letterRules = wordFilterRef.current.value.split('\n');
      setRules(letterRules);
    }
  };
  const handleReset = () => {
    if (wordFilterRef.current != null) {
      wordFilterRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <Text>
        Enter each letter, the index, and whether it&apos;s <strong>+</strong>{' '}
        for placed (green) or <strong>-</strong> for excluded (yellow)
      </Text>
      <textarea
        ref={wordFilterRef}
        rows={20}
        className="mb-2 h-48 bg-slate-800 p-4 text-slate-200"
      />
      <div className="flex">
        <Button variant="primary" onClick={handleRules}>
          Calculate
        </Button>
        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <Text className="mx-10 my-2 italic text-stone-400">
        EG: if the letter A in the first spot is yellow, then enter: A1-
      </Text>
    </div>
  );
};

export default WordFilterRules;
