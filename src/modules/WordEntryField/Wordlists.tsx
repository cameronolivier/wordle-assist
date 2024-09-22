import { words as words496 } from '~/data/words_496';
import { words as words1860 } from '~/data/words_1860';
import { words as words2508 } from '~/data/words_2508';
import { words as words12481 } from '~/data/words_12481';
import { words } from '~/data/words.json';

import Button from '../../components/Button';
import Header from '../../components/Heading';

export const wordLists = {
  words,
  words496,
  words1860,
  words2508,
  words12481,
} as const;

type WordList = keyof typeof wordLists;

type Props = {
  onWordsUpdate: (words: string[]) => void;
};
export default function WordLists({ onWordsUpdate }: Props) {
  const handleSelectList = (list: WordList) => async () => {
    onWordsUpdate(wordLists[list]);
  };
  return (
    <div className="mt-10 flex flex-col">
      <Header size="h4" className="mb-2 text-center text-slate-600">
        Choose another word list:
      </Header>
      <div className="flex">
        <Button onClick={handleSelectList('words12481')} variant="primary">
          12K
        </Button>
        <Button onClick={handleSelectList('words2508')} variant="secondary">
          2508
        </Button>
        <Button onClick={handleSelectList('words1860')} variant="secondary">
          1860
        </Button>
        <Button onClick={handleSelectList('words496')} variant="secondary">
          496
        </Button>
      </div>
    </div>
  );
}
