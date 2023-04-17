import { useRef } from 'react';

import Button from '~/components/Button';
import Header from '~/components/Heading';
import Text from '~/components/Text';

import UnformattedWords from './UnformattedWords';

interface Props {
  onWordsUpdate: (words: string[]) => void;
  className?: string;
  isVisible?: boolean;
}
const WordEntryField = ({
  onWordsUpdate,
  className,
  isVisible = false,
}: Props) => {
  const wordsRef = useRef<HTMLTextAreaElement>(null);

  const handleWordsFieldUpdate = (words: string) => {
    if (wordsRef.current != null) {
      wordsRef.current.value = words;
    }
  };

  const convertLongWordLists = async (words: string) => {
    return new Promise<string[]>((resolve, reject) => {
      try {
        const longList = words.split('\n');
        resolve(longList);
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleWords = async () => {
    if (wordsRef.current != null) {
      const words = await convertLongWordLists(wordsRef.current.value);
      onWordsUpdate(words);
    }
  };

  const handleReset = () => {
    if (wordsRef.current != null) {
      wordsRef.current.value = '';
      onWordsUpdate([]);
    }
  };

  return (
    <>
      {isVisible && (
        <div className={className}>
          <UnformattedWords onWordsUpdate={handleWordsFieldUpdate} />
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
            For strings longer than 5 characters, only the first 5 characters
            will be tallied.
          </Text>
        </div>
      )}
    </>
  );
};

export default WordEntryField;
