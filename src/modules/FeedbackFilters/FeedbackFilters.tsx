import React, { useCallback, useEffect, useState } from 'react';

import Text from '../../components/Text';
import { tw } from '../../utils/tailwind.utils';

const bgColorMap = ['bg-slate-600', 'bg-yellow-400', 'bg-green-400'];
const textColorMap = ['text-slate-300', 'text-yellow-900', 'text-green-900'];

type Word = {
  value: string;
  letters: Letter[];
  index: number;
};

type Letter = {
  value: string;
  state: number;
  index: number;
};

type FeedbackLetterProps = {
  letter: Letter;
  onSetState: (letter: Letter) => void;
};
const FeedbackLetter = ({ letter, onSetState }: FeedbackLetterProps) => {
  const { state, value, index } = letter;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const newState = state + 1 === bgColorMap.length ? 0 : state + 1;
    console.log({ newState });
    onSetState({ value, state: newState, index });
  };
  return (
    <button
      onClick={handleClick}
      className={tw(
        'm-2 h-10 w-12 justify-center border border-solid border-slate-600 p-2 text-center',
        bgColorMap[state]
      )}
    >
      <Text className={textColorMap[state]}>{letter.value.toUpperCase()}</Text>
    </button>
  );
};

type FeedbackWordProps = {
  word: Word;
  updateWord: (word: Word) => void;
};
const FeedbackWord = ({ word, updateWord }: FeedbackWordProps) => {
  const [forceUpdate, setForceUpdate] = useState(true);
  const { index, letters, value } = word;

  const handleUpdateLetters = (letter: Letter) => {
    const xLetters = letters;
    xLetters[letter.index] = letter;
    updateWord({ index, value, letters: xLetters });
    setForceUpdate(!forceUpdate);
  };

  return (
    <div className="flex flex-row">
      {word.letters.map((letter) => {
        return (
          <FeedbackLetter
            key={`${letter.value}${letter.index}`}
            letter={letter}
            onSetState={handleUpdateLetters}
          />
        );
      })}
    </div>
  );
};

const filtersTypes = ['exclude', 'include', 'place'] as const;

export type Filter = {
  type: typeof filtersTypes[number];
  letter: string;
  position: number;
};

type Props = {
  words: string[];
  onFiltersUpdate: (filters: Filter[]) => void;
};
const FeedbackFilters = ({ words, onFiltersUpdate }: Props) => {
  const [wordMatrix, setWordMatrix] = useState<Word[]>([]);

  const updateWordMatrix = useCallback(() => {
    setWordMatrix((prevWordMatrix) => {
      return words.map((word, index) => {
        const existingWord = prevWordMatrix.find((w) => w && w.value === word);

        if (existingWord) {
          return existingWord;
        }

        return {
          index,
          value: word,
          letters: word
            .split('')
            .map((letter, index) => ({ value: letter, state: 0, index })),
        };
      });
    });
  }, [words]);

  useEffect(() => {
    updateWordMatrix();
  }, [words, updateWordMatrix]);

  const onWordUpdate = (word: Word) => {
    // @ts-ignore toSpliced does exist
    const newWordMatrix = wordMatrix.toSpliced(word.index, 1, word);
    setWordMatrix(newWordMatrix);
  };

  useEffect(() => {
    const filters: Filter[] = wordMatrix.flatMap((word) => {
      return word.letters.map((letter) => {
        return {
          type: filtersTypes[letter.state] || 'exclude',
          letter: letter.value,
          position: letter.index,
        };
      });
    });
    console.log({ filters });
    onFiltersUpdate(filters);
  }, [onFiltersUpdate, wordMatrix]);

  return (
    <>
      {wordMatrix.length > 0 && (
        <div className="mb-10 w-full rounded border border-solid border-slate-700 p-4">
          {wordMatrix.map((word) => {
            return (
              <FeedbackWord
                key={word.value}
                word={word}
                updateWord={onWordUpdate}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default FeedbackFilters;
