import { useRef } from 'react';

import Button from '~/components/Button';
import Text from '~/components/Text';

import UnformattedWords from './UnformattedWords';
import WordLists from './Wordlists';

interface Props {
  onWordsUpdate: (words: string[]) => void;
  className?: string;
}
const WordEntryField = ({ onWordsUpdate, className }: Props) => {
  const wordsRef = useRef<HTMLTextAreaElement>(null);

  const handleWordsFieldUpdate = (words: string) => {
    if (wordsRef.current != null) {
      wordsRef.current.value = words;
    }
  };

  const handleWords = async () => {
    const handleLongLists = new Promise<string[]>((resolve, reject) => {
      if (wordsRef.current != null) {
        try {
          const longList = wordsRef.current.value.split('\n');
          resolve(longList);
        } catch (error) {
          reject(error);
        }
      }
    });
    const words = await handleLongLists;
    onWordsUpdate(words);
  };

  const handleReset = () => {
    if (wordsRef.current != null) {
      wordsRef.current.value = '';
      onWordsUpdate([]);
    }
  };

  return (
    <div className={className}>
      <UnformattedWords onWordsUpdate={handleWordsFieldUpdate} />
      <WordLists onWordsUpdate={handleWordsFieldUpdate} />
      <Text className="text-slate-300">
        1: Enter your list of 5 letter words:
      </Text>
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
