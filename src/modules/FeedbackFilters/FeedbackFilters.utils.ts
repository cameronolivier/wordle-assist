import { Filter } from './FeedbackFilters';

export const filterAll = (filters: Filter[]) => (words: string[]) => {
  if (filters.length === 0) {
    return words;
  }

  return words.filter((word) => {
    return filters.every((filter) => {
      if (filter.type === 'exclude') {
        return !word.includes(filter.letter);
      }
      if (filter.type === 'include') {
        return (
          word.includes(filter.letter) &&
          word[filter.position] !== filter.letter
        );
      }
      if (filter.type === 'place') {
        return (
          word.includes(filter.letter) &&
          word[filter.position] === filter.letter
        );
      }
      return true;
    });
  });
};
