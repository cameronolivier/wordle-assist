import './App.css';

import { useMemo, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import ErrorBoundary from '~/components/ErrorBoundary';
import Header from '~/components/Heading';
import ExcludeLetters from '~/modules/ExcludeLetters';
import { LetterCount } from '~/modules/LetterCount';
import RankedWords from '~/modules/RankedWords';
import WordEntryField from '~/modules/WordEntryField';
import WordFilterRules from '~/modules/WordFilterRules';

import Text from '../../components/Text';

import {
  filterIncludedLetters,
  filterRemovedLetters,
  filterWords,
  Letters,
} from './App.utils';

const App = () => {
  const [words, setWords] = useState<string[]>([]);
  const [letters, setLetters] = useState<Letters>({});
  const [excludedLetters, setExcludedLetters] = useState<string[]>([]);
  const [filterRules, setFilterRules] = useState<string[]>([]);

  const filteredWords = useMemo(() => {
    return filterWords([
      filterIncludedLetters(filterRules),
      filterRemovedLetters(excludedLetters),
    ])(words);
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
            <div className="mr-5 mb-10 flex flex-col">
              <Header className="mb-10">Words:</Header>
              <WordEntryField
                onWordsUpdate={setWords}
                className="flex flex-1 flex-col"
              />
            </div>
            <div className="mr-10 mb-10 flex flex-1 flex-col">
              <Header className="mb-10">Filters:</Header>
              <ExcludeLetters
                className="mb-10"
                onRemoveLetters={setExcludedLetters}
              />
              <WordFilterRules
                onSetFilters={setFilterRules}
                className=" flex flex-1 flex-col"
              />
            </div>
            <div className="mr-10 flex flex-1 flex-col">
              <Header className="mb-10">Results:</Header>
              <div className="flex flex-1 flex-col md:flex-row">
                <LetterCount
                  words={filteredWords}
                  onLettersUpdate={setLetters}
                  isVisible={filteredWords.length > 0}
                />
                <RankedWords
                  letters={letters}
                  words={filteredWords}
                  className="mt-10 flex-1 md:mt-0"
                  isVisible={filteredWords.length > 0}
                />
              </div>
            </div>
          </div>
          <div className="my-5 px-10">
            <Text className="text-2xl text-slate-300">How it works:</Text>
            <Text className="text-slate-300">
              1. Enter a list of words and press &quot;Add&quot;. This will be
              the dictionary of words that the app will query and provide
              results from. Feel free to use one of our supplied dictionaries or
              add your own.
              <br />
              2. Either pick the first word in the list of results or use your
              own - and enter it into your Wordle game.
              <br />
              3. Based on the Wordle feedback, update the filters section. Add
              the letters to exclude as well as the letters to include, setting
              based on the yellow/green feedback.
              <br />
              4. The app will provide a list of available words ranked by the
              sum of the number of times each letter appears in the word list.
              This should provide you with the best word to filter out
              high-frequency letters.
              <br />
              5. Plug this word (in 4) into Wordle, or feel free to pick one of
              the other options.
              <br />
              6. Repeat steps 3-5 until you have won Wordle for today (or run
              out of turns).
            </Text>
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
