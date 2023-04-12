import { words as words496 } from '~/data/words_496';
import { words as words1860 } from '~/data/words_1860';
import { words as words2508 } from '~/data/words_2508';
import { words as words12481 } from '~/data/words_12481';

import Button from '../../components/Button';
import Text from '../../components/Text';

const wordLists = {
  words496,
  words1860,
  words2508,
  words12481,
} as const;

type WordList = keyof typeof wordLists;

type Props = {
  onWordsUpdate: (words: string) => void;
};
export default function WordLists({ onWordsUpdate }: Props) {
  const handleSelectList = (list: WordList) => async () => {
    const handleLongLists = new Promise<string>((resolve, reject) => {
      try {
        const longList = wordLists[list].join('\n');
        resolve(longList);
      } catch (error) {
        reject(error);
      }
    });
    const words = await handleLongLists;
    onWordsUpdate(words);
  };
  return (
    <div className="mb-5 flex flex-col">
      <Text className="text-slate-300">
        0: Select a words list to prepopulate the list (Optional):
      </Text>
      <div className="flex">
        <Button onClick={handleSelectList('words496')} variant="primary">
          Add
          <br />
          496
          <br />
          words
        </Button>
        <Button onClick={handleSelectList('words1860')} variant="primary">
          Add
          <br />
          1860
          <br />
          words
        </Button>
        <Button onClick={handleSelectList('words2508')} variant="primary">
          Add
          <br />
          2508
          <br />
          words
        </Button>
        <Button onClick={handleSelectList('words12481')} variant="primary">
          Add
          <br />
          12481
          <br />
          words
        </Button>
      </div>
    </div>
  );
}
