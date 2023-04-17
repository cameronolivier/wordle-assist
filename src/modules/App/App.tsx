import './App.css';

import { useCallback, useMemo, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import ErrorBoundary from '~/components/ErrorBoundary';
import Header from '~/components/Heading';
import { LetterCount } from '~/modules/LetterCount';
import RankedWords from '~/modules/RankedWords';

import Typography from '../../components/Typography';
import FeedbackFilters from '../FeedbackFilters';
import { Filter } from '../FeedbackFilters/FeedbackFilters';
import { filterAll } from '../FeedbackFilters/FeedbackFilters.utils';
import { Letters } from '../LetterCount/LetterCount.utils';
import WordLists, { wordLists } from '../WordEntryField/Wordlists';

const App = () => {
  const [words, setWords] = useState<string[]>(wordLists.words12481);
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
    <div className="flex min-h-screen flex-col items-center justify-start bg-slate-900">
      <Toaster position="bottom-center" />
      <ErrorBoundary
        fallback={<Header className="mt-20">Something went wrong.</Header>}
      >
        <div className="flex min-h-screen w-screen flex-col items-center justify-start">
          <div className="mt-5 md:w-1/3">
            <Header size="h2" className="mb-6 px-10 text-center text-slate-400">
              Wordle Assist
            </Header>
            <div className="flex flex-col px-10">
              <div className="mb-2 flex flex-col">
                <div className="border-b-4 border-b-slate-800 pb-4">
                  <div className="flex flex-row justify-between">
                    <Typography className="text-slate-400">
                      Words: {words.length}
                    </Typography>
                    <Typography className="text-slate-400">
                      Filtered: {filteredWords.length}
                    </Typography>
                  </div>
                  <Header size="h3" className="mt-6 mb-1 text-slate-400">
                    Select your Wordle picks:
                  </Header>
                  <div className="flex flex-1 flex-row">
                    <RankedWords
                      letters={letters}
                      words={filteredWords}
                      onWordSelect={addSelectedWord}
                      className="mb-2 flex-1 md:mt-0"
                      isVisible={filteredWords.length > 0}
                    />
                    <LetterCount
                      words={filteredWords}
                      onLettersUpdate={setLetters}
                      isVisible={false}
                    />
                  </div>
                </div>
                <FeedbackFilters
                  words={selectedWords}
                  onFiltersUpdate={onFiltersUpdate}
                />
                <WordLists onWordsUpdate={setWords} />
              </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default App;
