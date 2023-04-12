import './App.css';

import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import ErrorBoundary from '~/components/ErrorBoundary';
import Header from '~/components/Heading';
import ExcludeLetters from '~/modules/ExcludeLetters';
import { LetterCount, type Letters } from '~/modules/LetterCount';
import RankedWords from '~/modules/RankedWords';
import WordEntryField from '~/modules/WordEntryField';
import WordFilterRules from '~/modules/WordFilterRules';

import { filterOnExcludedLetters, filterWords } from './App.utils';

const App = () => {
  const [words, setWords] = useState<string[]>([]);
  const [letters, setLetters] = useState<Letters>({});
  const [excludedLetters, setExcludedLetters] = useState<string[]>([]);
  const [filterRules, setFilterRules] = useState<string[]>([]);
  const [filteredWords, setFilteredWords] = useState<string[]>([]);

  useEffect(() => {
    if (words.length === 0) {
      return setFilteredWords([]);
    }

    const updateFilteredWords = async () => {
      const filteredOnExcludedLetters =
        excludedLetters.length > 0
          ? await filterOnExcludedLetters(words, excludedLetters)
          : words;

      const w =
        filterRules.length > 0
          ? await filterWords(filteredOnExcludedLetters, filterRules)
          : filteredOnExcludedLetters;

      setFilteredWords(w);
    };

    updateFilteredWords();
  }, [excludedLetters, filterRules, words]);

  return (
    <div className="flex min-h-screen content-center justify-center bg-slate-900">
      <Toaster position="bottom-center" />
      <ErrorBoundary
        fallback={<Header className="mt-20">Something went wrong.</Header>}
      >
        <div className="mt-5">
          <Header className="mb-10 px-10">Wordle Assist</Header>
          <div className="flex w-screen flex-col px-10 md:flex-row">
            <div className="mr-5 flex">
              <WordEntryField
                onWordsUpdate={setWords}
                className="mb-10 flex flex-1 flex-col"
              />
            </div>
            <div className="mr-10 flex flex-1 flex-col">
              <ExcludeLetters
                className="mb-10"
                onRemoveLetters={setExcludedLetters}
              />
              <WordFilterRules
                onSetFilters={setFilterRules}
                className="flex flex-1 flex-col"
              />
            </div>
            <div className="flex flex-1 flex-col md:flex-row">
              <LetterCount words={filteredWords} onLettersUpdate={setLetters} />
              <RankedWords
                letters={letters}
                words={filteredWords}
                className="mt-10 flex-1 md:mt-0"
              />
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default App;

// TODO:
//  1. we want a visual representation of the card that can take user feedback. First via adding
//  in a 5 letter word, then by clicking on each letter to define its state (excluded, included,
//  placed).
//  Maybe we should do 1 row at a time?
//  2. we then want to calculate all possible words, for the given rules. Then split and count
//  number of times each letter occurs. Once we have a score, take the top letters until we have
//  5, and search for possible words. If we don't have any, reduce until we do. (BONUS: if we
//  have say a letter with 10 that received no words, but 2 letters with 9 that do, then take
//  that word. Bonus points to save the highest word for each response for quicker generation
//  (is this even necessary?)
//  Something to note - to provide a word we'd need to have some form of DB to query. I'm
//  considering leaning on a spell check library and just running each option against that to
//  see if it's a real word or not. Alternatively might be too investigate the wordle codebase
//  again and see if they have an updated list of allowed words... (or another API maybe?)
//  3. Once we have a suggested next word the user should be able to click 'use' and we'd
//  autofill the next row with the suggested word. They'd update the feedback received from the
//  wordle card (excl, incl, placed) and click 'calculate' to repeat above steps and come out
//  with the next suggested word (maybe top 3?)
//  4. we should repeat the above until the user completes the card.
