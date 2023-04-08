import { useEffect, useRef, useState } from 'react';

import Button from '~/components/Button';
import Text from '~/components/Text';
import { type Maybe } from '~/types';

interface Props {
  onWordsUpdate: (words: Maybe<string[]>) => void;
}
const WordEntryField = ({ onWordsUpdate }: Props) => {
  const [words, setWords] = useState<string[]>();
  const wordsRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    console.log({ words });
    onWordsUpdate(words);
  }, [onWordsUpdate, words]);

  const handleWords = () => {
    if (wordsRef.current != null) {
      console.log(wordsRef.current.value);
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
        rows={10}
        className="mb-2 h-56 bg-slate-800 p-4 text-slate-200"
      />
      <div className="flex">
        <Button onClick={handleWords} variant="primary">
          Calculate
        </Button>
        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <p className="mx-10 my-2 italic text-stone-400">
        For strings longer than 5 characters, only the first 5 characters will
        be tallied.
      </p>
    </div>
  );
};

export default WordEntryField;
