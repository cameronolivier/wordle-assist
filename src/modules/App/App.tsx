import './App.css'
import { useEffect, useState } from 'react'
import { LetterCount, Letters } from '../../components/LetterCount'
import RankedWords from '../../components/RankedWords'
import WordEntryField from '../../components/WordEntryField'
import WordFilterRules from '../../components/WordFilterRules'
import { filterWords } from '../../components/WordFilterRules/WordFilterRules.utils'
import { Maybe } from '../../types'
const App = () => {
  const [rules, setRules] = useState<Maybe<string[]>>()
  const [words, setWords] = useState<Maybe<string[]>>()
  const [filteredWords, setFilteredWords] = useState<Maybe<string[]>>()
  const [letters, setLetters] = useState<Letters>({})

  useEffect(() => {
    if (rules && words) {
      const wordsFiltered = filterWords(rules, words)
      setFilteredWords(wordsFiltered)
    }
  }, [rules, words])

  return (
    <div className="App">
      <h1 className="mb-10">Wordle Assist</h1>
      <div className="flex">
        <WordFilterRules onSetRules={setRules} />
        <WordEntryField onWordsUpdate={setWords} />
        <LetterCount words={filteredWords} onLettersUpdate={setLetters} />
        <RankedWords letters={letters} words={filteredWords} />
      </div>
    </div>
  )
}

export default App

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
