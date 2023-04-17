import './App.css';

import { useCallback, useMemo, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import ErrorBoundary from '~/components/ErrorBoundary';
import Header from '~/components/Heading';
import { LetterCount } from '~/modules/LetterCount';
import RankedWords from '~/modules/RankedWords';
import WordEntryField from '~/modules/WordEntryField';

import Text from '../../components/Text';
import FeedbackFilters from '../FeedbackFilters';
import { Filter } from '../FeedbackFilters/FeedbackFilters';
import WordLists from '../WordEntryField/Wordlists';

import { filterAll, Letters } from './App.utils';

const App = () => {
  const [words, setWords] = useState<string[]>([]);
  const [letters, setLetters] = useState<Letters>({});
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);

  const addSelectedWord = (word: string) => {
    setSelectedWords((prevWords) => [...prevWords, word]);
  };

  const onFiltersUpdate = useCallback((filters: Filter[]) => {
    setFilters(filters);
  }, []);

  const filteredWords = useMemo(() => {
    return filterAll(filters)(words);
  }, [filters, words]);

  return (
    <div className="flex min-h-screen content-center justify-center bg-slate-900">
      <Toaster position="bottom-center" />
      <ErrorBoundary
        fallback={<Header className="mt-20">Something went wrong.</Header>}
      >
        <div className="mt-5">
          <Header size="h1" className="mb-10 px-10">
            Wordle Assist
          </Header>
          <div className="flex w-screen flex-col px-10 md:flex-row">
            <div className="mr-5 mb-10 flex flex-col">
              <Header className="mb-5">Words:</Header>
              <WordLists onWordsUpdate={setWords} />
              <WordEntryField
                onWordsUpdate={setWords}
                className="flex flex-1 flex-col"
              />
              <div className="mb-10 flex flex-row justify-between">
                <Text>Words: {words.length}</Text>
                <Text>Filtered: {filteredWords.length}</Text>
              </div>
              <Header className="mb-5">Filters:</Header>
              <FeedbackFilters
                words={selectedWords}
                onFiltersUpdate={onFiltersUpdate}
              />
            </div>
            <div className="mr-10 flex flex-1 flex-col">
              <Header className="mb-0">Results:</Header>
              <div className="flex flex-1 flex-row">
                <RankedWords
                  letters={letters}
                  words={filteredWords}
                  onWordSelect={addSelectedWord}
                  className="mt-2 flex-1 md:mt-0"
                  isVisible={filteredWords.length > 0}
                />
                <LetterCount
                  words={filteredWords}
                  onLettersUpdate={setLetters}
                  isVisible={false}
                />
              </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default App;
