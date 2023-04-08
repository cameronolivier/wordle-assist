import { useEffect, useRef, useState } from 'react';

import Text from '~/components/Text';
import { type Maybe } from '~/types';

interface Props {
  onWordsUpdate: (words: Maybe<string[]>) => void;
}
const WordEntryField = ({ onWordsUpdate }: Props) => {
  const [words, setWords] = useState<string[]>();
  const wordsRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    onWordsUpdate(words);
  }, [onWordsUpdate, words]);

  const handleWords = () => {
    if (wordsRef.current != null) {
      const wordList = wordsRef.current?.value.split('\n');
      setWords(wordList);
    }
  };

  const handleReset = () => {
    if (wordsRef.current != null) {
      wordsRef.current.value = '';
    }
  };

  return (
    <div className="mb-20 flex flex-1 flex-col">
      <Text className="text-slate-300">Enter your list of 5 letter words:</Text>
      <textarea
        ref={wordsRef}
        rows={20}
        onBlur={handleWords}
        className="text-l ls-1 mb-2 h-56 bg-slate-800 p-4"
      />
      <div className="flex">
        <button
          className="block flex-1 content-center justify-center bg-slate-600"
          onClick={handleWords}
        >
          Calculate
        </button>
        <button
          className="block flex-1 content-center justify-center bg-slate-900"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      <p className="mx-10 my-2 italic text-stone-400">
        For strings longer than 5 characters, only the first 5 characters will
        be tallied
      </p>
    </div>
  );
};

export default WordEntryField;
