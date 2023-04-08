import { useEffect, useRef, useState } from 'react';

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
      <p className="text-gray-300">
        Enter each letter, the index, and whether it&apos;s <strong>+</strong>{' '}
        for placed (green) or <strong>-</strong> for excluded (yellow)
      </p>
      <textarea
        ref={wordFilterRef}
        rows={20}
        className="text-l ls-1 mb-2 h-56 p-4"
      />
      <div className="flex">
        <button
          className="block flex-1 content-center justify-center"
          onClick={handleRules}
        >
          Calculate
        </button>
        <button
          className="block flex-1 content-center  justify-center"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      <p className="mx-10 my-2 italic text-stone-400">
        EG: if the letter A in the first spot is yellow, then enter: A1-
      </p>
    </div>
  );
};

export default WordFilterRules;
