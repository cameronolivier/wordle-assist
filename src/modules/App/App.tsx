import './App.css'
import { useState, FocusEvent, useEffect } from 'react'

type Letters = Record<string, number>
type WordCount = {
  count: number
  raw: Letters[]
}
type WordCounts = Record<string, WordCount>

const App = () => {
  const [words, setWords] = useState<string[]>()
  const [letters, setLetters] = useState<Letters>({})
  const [wordCounts, setWordCounts] = useState<WordCounts>({})

  useEffect(() => {
    if (Object.keys(letters).length > 0 && words && words.length > 0) {
      const _wordCounts: WordCounts = {}
      words.forEach((word) => {
        _wordCounts[word.slice(0, 5)] = {
          count: word
            .split('')
            .slice(0, 5)
            .map((letter, index) => {
              if (index > word.indexOf(letter)) {
                return `${letter}${letter}`
              }
              return letter
            })
            .reduce((acc, curr): number => {
              return letters[curr] + acc
            }, 0),
          raw: word
            .split('')
            .slice(0, 5)
            .map((char) => ({ [char]: letters[char] } as Letters)),
        }
      })
      setWordCounts(_wordCounts)
    }
  }, [letters, words])

  const handleWords = (
    e: FocusEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
  ) => {
    const wordList = e.target.value.split('\n')
    setWords(wordList)
  }

  useEffect(() => {
    const _letters: Letters = {}
    if (words && words.length > 0) {
      words.forEach((word) => {
        word
          .split('')
          .slice(0, 5)
          .forEach((char, index) => {
            if (index > word.indexOf(char)) {
              const key = `${char}${char}`
              const curr = _letters.hasOwnProperty(key) ? _letters[key] : 0
              _letters[key] = curr + 1
            } else {
              const curr = _letters.hasOwnProperty(char) ? _letters[char] : 0
              _letters[char] = curr + 1
            }
          })
      })
      setLetters(_letters)
    }
  }, [words])

  return (
    <div className="App">
      <h1 className="mb-10">Enter your list of 5 letter words:</h1>
      <div className="flex">
        <div className="flex-1">
          <textarea
            rows={20}
            onBlur={handleWords}
            className="h-56 text-l ls-1 p-4"
          />
          <p className="italic text-stone-400 border-b border-slate-600 mx-10 mt-2 pb-2">
            Values calculated on blur.
          </p>
          <p className="italic text-stone-400 mx-10 my-2">
            For strings longer than 5 characters, only the first 5 characters
            will be tallied
          </p>
        </div>
        <div className="flex-1">
          <h2 className="text-3xl text-left">Letter Counts:</h2>
          <div>
            {Object.keys(letters).length > 0 &&
              Object.entries(letters).map((entry) => (
                <p className="text-left">
                  {entry[0]}: {entry[1]}
                </p>
              ))}
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-3xl text-left">Results:</h2>
          <div>
            {Object.keys(wordCounts).length > 0 &&
              Object.entries(wordCounts)
                .sort((a, b) => b[1].count - a[1].count)
                .map((entry) => (
                  <p>
                    <pre>
                      {entry[0]}: {entry[1].count}
                    </pre>
                  </p>
                ))}
          </div>
        </div>
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
