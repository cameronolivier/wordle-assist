import { FocusEvent, useEffect, useState } from 'react'
import { Maybe } from '../../types'

type Props = {
  onWordsUpdate: (words: Maybe<string[]>) => void
}
const WordEntryField = ({ onWordsUpdate }: Props) => {
  const [words, setWords] = useState<string[]>()

  useEffect(() => {
    onWordsUpdate(words)
  }, [onWordsUpdate, words])

  const handleWords = (
    e: FocusEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
  ) => {
    const wordList = e.target.value.split('\n')
    setWords(wordList)
  }
  return (
    <div className="flex-1">
      <p>Enter your list of 5 letter words:</p>
      <textarea
        rows={20}
        onBlur={handleWords}
        className="h-56 text-l ls-1 p-4"
      />
      <p className="italic text-stone-400 border-b border-slate-600 mx-10 mt-2 pb-2">
        Values calculated on blur.
      </p>
      <p className="italic text-stone-400 mx-10 my-2">
        For strings longer than 5 characters, only the first 5 characters will
        be tallied
      </p>
    </div>
  )
}

export default WordEntryField
