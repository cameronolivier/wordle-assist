import { FocusEvent, useEffect, useRef, useState } from 'react'
import { Maybe } from '../../types'

type Props = {
  onWordsUpdate: (words: Maybe<string[]>) => void
}
const WordEntryField = ({ onWordsUpdate }: Props) => {
  const [words, setWords] = useState<string[]>()
  const wordsRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    onWordsUpdate(words)
  }, [onWordsUpdate, words])

  const handleWords = () => {
    if (wordsRef.current) {
      const wordList = wordsRef.current?.value.split('\n')
      setWords(wordList)
    }
  }

  return (
    <div className="flex flex-col flex-1 mb-20">
      <p>Enter your list of 5 letter words:</p>
      <textarea
        ref={wordsRef}
        rows={20}
        onBlur={handleWords}
        className="h-56 text-l ls-1 p-4 mb-2"
      />
      <button
        className="block justify-center content-center"
        onClick={handleWords}
      >
        Next
      </button>

      <p className="italic text-stone-400 mx-10 my-2">
        For strings longer than 5 characters, only the first 5 characters will
        be tallied
      </p>
    </div>
  )
}

export default WordEntryField
