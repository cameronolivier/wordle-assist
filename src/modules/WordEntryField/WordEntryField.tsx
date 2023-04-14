import { useRef } from 'react';

import Button from '~/components/Button';
import Text from '~/components/Text';

import Header from '../../components/Heading';

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
      <Header size="h3">Add your list of 5 letter words to query:</Header>
      <textarea
        ref={wordsRef}
        rows={5}
        className="h-40 bg-slate-800 p-4 text-slate-200"
      />
      <div className="mt-4 flex">
        <Button variant="secondary" onClick={handleReset}>
          Clear
        </Button>
        <Button onClick={handleWords} variant="primary">
          Set word list
        </Button>
      </div>
      <Text className="my-2 italic text-stone-400">
        Each word should be on a new line.
        <br />
        For strings longer than 5 characters, only the first 5 characters will
        be tallied.
      </Text>
    </div>
  );
};

export default WordEntryField;
