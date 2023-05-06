# ROADMAP

## TODO:

- [ ] 1: we want a visual representation of the card that can take user feedback. First via adding
      in a 5 letter word, then by clicking on each letter to define its state (excluded, included,
      placed). Maybe we should do 1 row at a time?

- [ ] 2: we then want to calculate all possible words, for the given rules. Then split and count
      number of times each letter occurs. Once we have a score, take the top letters until we have
      5, and search for possible words. If we don't have any, reduce until we do. (BONUS: if we
      have say a letter with 10 that received no words, but 2 letters with 9 that do, then take
      that word. Bonus points to save the highest word for each response for quicker generation
      (is this even necessary?)
      Something to note - to provide a word we'd need to have some form of DB to query. I'm
      considering leaning on a spell check library and just running each option against that to
      see if it's a real word or not. Alternatively might be too investigate the wordle codebase
      again and see if they have an updated list of allowed words... (or another API maybe?)

- [ ] 3: Once we have a suggested next word the user should be able to click 'use' and we'd
      autofill the next row with the suggested word. They'd update the feedback received from the
      wordle card (excl, incl, placed) and click 'calculate' to repeat above steps and come out
      with the next suggested word (maybe top 3?)

- [ ] 4: we should repeat the above until the user completes the card.

- [ ] 5: Add a new algorithm that adds the number of times each letter is in that specific position to the count as 
  an additional tally (do I need to weight this at all?)
- [ ] 6: Get data of all previous answers and grey out (or simply remove?) and words already used
-  [ ] 7: remove all plurals (and others? there are other words that aren't really used - like rude words, etc)
\
