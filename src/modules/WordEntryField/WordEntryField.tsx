import { useEffect, useRef, useState } from 'react';

import Button from '~/components/Button';
import Text from '~/components/Text';
import { type Maybe } from '~/types';

interface Props {
  onWordsUpdate: (words: Maybe<string[]>) => void;
  className?: string;
}
const WordEntryField = ({ onWordsUpdate, className }: Props) => {
  const [words, setWords] = useState<string[]>();
  const wordsRef = useRef<HTMLTextAreaElement>(null);
  const unstyledRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log({ words });
    onWordsUpdate(words);
  }, [onWordsUpdate, words]);

  const handleStyleWords = () => {
    if (unstyledRef.current != null && wordsRef.current != null) {
      wordsRef.current.value = (
        unstyledRef.current.value.match(/.{1,5}/g) ?? []
      ).join('\n');
    }
  };

  const resetStyleWords = () => {
    if (unstyledRef.current != null) {
      unstyledRef.current.value = '';
    }
  };

  const handleWords = () => {
    if (wordsRef.current != null) {
      const wordList = wordsRef.current.value.split('\n');
      setWords(wordList);
    }
  };

  const handleReset = () => {
    if (wordsRef.current != null) {
      wordsRef.current.value = '';
    }
  };

  return (
    <div className={className}>
      <div className="mb-5 flex flex-col">
        <Text className="text-slate-300">
          Enter to convert a flat string into enter-delimited list (Optional):
        </Text>
        <input
          ref={unstyledRef}
          className="mb-2 w-full bg-slate-800 p-4 text-slate-200"
        />
        <div className="flex">
          <Button onClick={handleStyleWords} variant="primary">
            Style
          </Button>
          <Button variant="secondary" onClick={resetStyleWords}>
            Clear
          </Button>
        </div>
      </div>
      <Text className="text-slate-300">Enter your list of 5 letter words:</Text>
      <textarea
        ref={wordsRef}
        rows={15}
        className="mb-2 bg-slate-800 p-4 text-slate-200"
      />
      <div className="flex">
        <Button onClick={handleWords} variant="primary">
          Add
        </Button>
        <Button variant="secondary" onClick={handleReset}>
          Clear
        </Button>
      </div>

      <Text className="my-2 italic text-stone-400">
        For strings longer than 5 characters, only the first 5 characters will
        be tallied.
      </Text>
    </div>
  );
};

export default WordEntryField;
