import { Maybe } from '../../types'

export const rulesFilter = (rules: string[]) => (word: string) => {
  return rules.reduce((acc, rule) => {
    const letter = word[parseInt(rule[1]) - 1].toLowerCase()
    const condition = rule[0].toLowerCase()
    const hasPassed =
      rule[2] === '+' ? letter === condition : letter !== condition
    return acc && hasPassed
  }, true)
}

export const filterWords = (rules: Maybe<string[]>, words: Maybe<string[]>) => {
  if (!rules || !words) {
    return []
  }
  return words.filter(rulesFilter(rules))
}
