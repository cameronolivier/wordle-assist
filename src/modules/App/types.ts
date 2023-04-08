import { type Maybe } from '../../types';

import { letters, type letterStates } from './App.constants';

export type Letter =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

export type LetterState = typeof letterStates[keyof typeof letterStates];

export interface Char {
  letter: Maybe<Letter>;
  state: LetterState;
}
export type Word = [
  Maybe<Char>,
  Maybe<Char>,
  Maybe<Char>,
  Maybe<Char>,
  Maybe<Char>
];
export type Card = [
  Maybe<Word>,
  Maybe<Word>,
  Maybe<Word>,
  Maybe<Word>,
  Maybe<Word>,
  Maybe<Word>
];
