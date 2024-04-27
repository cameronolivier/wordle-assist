import { useRef } from 'react';

import Button from '~/components/Button';
import Header from '~/components/Heading';
import Typography from '~/components/Typography';

interface Props {
  onSetFilters: (rules: string[]) => void;
  className?: string;
}

const WordFilterRules = ({ onSetFilters, className }: Props) => {
  const wordFilterRef = useRef<HTMLTextAreaElement>(null);

  const handleRules = () => {
    if (wordFilterRef.current != null && wordFilterRef.current.value) {
      const letterRules = wordFilterRef.current.value.split('\n');
      onSetFilters(letterRules);
    }
  };
  const handleReset = () => {
    if (wordFilterRef.current != null) {
      wordFilterRef.current.value = '';
      onSetFilters([]);
    }
  };

  const handlePosition = (pos: number) => () => {
    if (wordFilterRef.current != null) {
      wordFilterRef.current.value += pos.toString();
      wordFilterRef.current.focus();
    }
  };

  const handleIncluded = () => {
    if (wordFilterRef.current != null) {
      wordFilterRef.current.value += '-';
      wordFilterRef.current.focus();
    }
  };
  const handlePlaced = () => {
    if (wordFilterRef.current != null) {
      wordFilterRef.current.value += '+';
      wordFilterRef.current.focus();
    }
  };

  const handleNewLine = () => {
    if (wordFilterRef.current != null) {
      wordFilterRef.current.value += '\n';
      wordFilterRef.current.focus();
    }
  };

  return (
    <div className={className}>
      <Header size="h3">Included letters:</Header>
      <Typography className="text-sm italic text-stone-400">
        These are the green and yellow letters in the Wordle results.
      </Typography>
      <textarea
        ref={wordFilterRef}
        rows={20}
        className="mb-2 h-48 bg-slate-800 p-4 text-slate-200"
      />
      <div className="mb-4 mt-2 rounded border border-solid border-slate-600 bg-slate-800 p-4">
        <div className="mb-2 flex">
          <Button variant="secondary" onClick={handlePosition(1)}>
            1
          </Button>
          <Button variant="secondary" onClick={handlePosition(2)}>
            2
          </Button>
          <Button variant="secondary" onClick={handlePosition(3)}>
            3
          </Button>
          <Button variant="secondary" onClick={handlePosition(4)}>
            4
          </Button>
          <Button variant="secondary" onClick={handlePosition(5)}>
            5
          </Button>
        </div>
        <div className="flex">
          <Button
            variant="secondary"
            onClick={handleIncluded}
            className="bg-yellow-400"
          >
            &nbsp;
          </Button>
          <Button
            variant="secondary"
            onClick={handlePlaced}
            className="bg-green-600"
          >
            &nbsp;
          </Button>
          <Button variant="secondary" onClick={handleNewLine}>
            &#9166;
          </Button>
        </div>
      </div>
      <div className="flex">
        <Button variant="secondary" onClick={handleReset}>
          Clear
        </Button>
        <Button variant="primary" onClick={handleRules}>
          Update filters
        </Button>
      </div>
      <Typography className="my-2 italic text-stone-400">
        Each rule should be on a new line.
        <br />
        <strong>Format:</strong> [Letter][Position][+/-]
        <br />
        Examples:
        <br />
        If the letter A in the first spot is yellow, then enter: A1- <br />
        If the letter A in the first spot is green, then enter: A1+
      </Typography>
    </div>
  );
};

export default WordFilterRules;
