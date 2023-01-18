import { FocusEvent, useEffect, useState } from 'react'
import { Maybe } from '../../types'

type Props = {
  words: Maybe<string[]>
  onFilterUpdate: (words: Maybe<string[]>) => void
}
const WordFilterRules = ({ words, onFilterUpdate }: Props) => {
  const [lettersPlaced, setLettersPlaced] = useState<string[]>([])

  useEffect(() => {
    console.log(lettersPlaced && words)
    if (lettersPlaced && words) {
      // const wordsFiltered = words.filter((word) => {
      //   return lettersPlaced.reduce((acc, letter) => {
      //     if (letter[2] === '-') {
      //       return acc && word[parseInt(letter[1])] !== letter[0]
      //     }
      //
      //     return acc && word[parseInt(letter[1])] === letter[0]
      //   }, false)
      // })

      const wordsFiltered = words.filter((word) => {
        return lettersPlaced.reduce((acc, letter) => {
          return acc || word[parseInt(letter[1])] === letter[0]
        }, true)
        const letter = lettersPlaced[0]
        return word[parseInt(letter[1])] === letter[0]
      })
      console.log({ wordsFiltered })

      onFilterUpdate(wordsFiltered)
    }
  }, [lettersPlaced, words])

  const handleWords = (
    e: FocusEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
  ) => {
    const letterPlacements = e.target.value.split('\n')
    setLettersPlaced(letterPlacements)
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
        EG: if the letter A in the first spot is yellow, then enter: A0-
      </p>
    </div>
  )
}

export default WordFilterRules
