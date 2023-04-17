import { useRef } from 'react';

import Button from '~/components/Button';
import Header from '~/components/Heading';

type Props = {
  isVisible?: boolean;
  onWordsUpdate: (words: string) => void;
};
export default function UnformattedWords({
  isVisible = false,
  onWordsUpdate,
}: Props) {
  const unstyledRef = useRef<HTMLInputElement>(null);

  const handleStyleWords = () => {
    if (unstyledRef.current != null) {
      const words = (unstyledRef.current.value.match(/.{1,5}/g) ?? []).join(
        '\n'
      );
      onWordsUpdate(words);
    }
  };

  const handleResetStyleWords = () => {
    if (unstyledRef.current != null) {
      unstyledRef.current.value = '';
    }
  };

  return (
    <>
      {isVisible && (
        <div className="mb-5 flex flex-col">
          <Header size="h4" className="text-slate-300">
            Enter to convert a flat string into enter-delimited list (Optional):
          </Header>
          <input
            ref={unstyledRef}
            className="mb-2 w-full bg-slate-800 p-4 text-slate-200"
          />
          <div className="flex">
            <Button onClick={handleStyleWords} variant="primary">
              Style
            </Button>
            <Button variant="secondary" onClick={handleResetStyleWords}>
              Clear
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
