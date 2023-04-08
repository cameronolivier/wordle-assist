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
    <div className="flex flex-col flex-1">
      <p className="text-gray-300">
        Enter each letter, the index, and whether it&apos;s <strong>+</strong> for placed (green) or <strong>-</strong> for excluded
        (yellow)
      </p>
      <textarea ref={wordFilterRef} rows={20} className="h-56 text-l ls-1 p-4 mb-2" />
      <div className="flex">
        <button className="block justify-center content-center flex-1" onClick={handleRules}>
          Calculate
        </button>
        <button className="block justify-center content-center  flex-1" onClick={handleReset}>
          Reset
        </button>
      </div>

      <p className="italic text-stone-400 mx-10 my-2">EG: if the letter A in the first spot is yellow, then enter: A1-</p>
    </div>
  );
};

export default WordFilterRules;
