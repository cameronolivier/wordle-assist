function isLikelyPlural(word: string): boolean {
    return word.endsWith('s') && !word.endsWith('ss');
  }

  export const sortByLikelyPlural = (a: string, b: string) => {
    const aPlural = isLikelyPlural(a);
    const bPlural = isLikelyPlural(b);
    
    if (aPlural && !bPlural) return 1;
    if (!aPlural && bPlural) return -1;
    return a.localeCompare(b);
  }

  
  
  // New function to sort words, moving likely plurals to the end
  export function sortWordsWithPluralsAtEnd(wordList: string[]): string[] {
    return wordList.sort(sortByLikelyPlural);
  }
  