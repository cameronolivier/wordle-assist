import { FocusEvent, useEffect, useState } from 'react'
import { Maybe } from '../../types'
import { filterWords } from './WordFilterRules.utils'

type Props = {
  words: Maybe<string[]>
  onFilterUpdate: (words: Maybe<string[]>) => void
}

const WordFilterRules = ({ words, onFilterUpdate }: Props) => {
  const [rules, setRules] = useState<string[]>([])

  useEffect(() => {
    if (rules && words) {
      const wordsFiltered = filterWords(rules, words)
      onFilterUpdate(wordsFiltered)
    }
  }, [rules, words])

  const handleWords = (
    e: FocusEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
  ) => {
    const letterRules = e.target.value.split('\n')
    setRules(letterRules)
  }

  return (
    <div className="flex-1">
      <p className="text-gray-300">
        Enter each letter, the index, and whether it's <strong>+</strong> for
        placed (green) or <strong>-</strong> for excluded (yellow)
      </p>
      <textarea
        rows={20}
        onBlur={handleWords}
        className="h-56 text-l ls-1 p-4"
      />
      <p className="text-gray-400">
        EG: if the letter A in the first spot is yellow, then enter: A1-
      </p>
    </div>
  )
}

export default WordFilterRules
