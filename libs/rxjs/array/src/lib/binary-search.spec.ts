import { binarySearch, BinarySearchResult } from '@rxjs-ninja/rxjs-array';
import { SortFn } from '@rxjs-ninja/rxjs-array';
import { marbles } from 'rxjs-marbles/jest';

type WordEntry = { index: number; word: string };
type NumberTuple = [number, number];

describe('binarySearch', () => {
  it(
    'should binary search an array of strings',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: ['c', 'b', 'a'],
        b: ['b', 'a', 'e'],
        c: ['z', 'y', 'x'],
      });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', {
        x: [1, 'b', ['a', 'b', 'c'], ['c', 'b', 'a']] as BinarySearchResult<string, string>,
        y: [1, 'b', ['a', 'b', 'e'], ['b', 'a', 'e']] as BinarySearchResult<string, string>,
        z: [-1, 'b', ['x', 'y', 'z'], ['z', 'y', 'x']] as BinarySearchResult<string, string>,
      });
      m.expect(input.pipe(binarySearch<string, string>('b'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should binary search an array of numbers',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [10, 20, 0], b: [20, 0, 10], c: [25, 15, 5] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', {
        x: [1, 10, [0, 10, 20], [10, 20, 0]] as BinarySearchResult<number, number>,
        y: [1, 10, [0, 10, 20], [20, 0, 10]] as BinarySearchResult<number, number>,
        z: [-1, 10, [5, 15, 25], [25, 15, 5]] as BinarySearchResult<number, number>,
      });
      m.expect(input.pipe(binarySearch<number, number>(10))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should binary search an array of objects',
    marbles((m) => {
      const sortObj: SortFn<WordEntry> = (a, b) => {
        if (a.index === b.index) return 0;
        return a.index < b.index ? -1 : 1;
      };
      const input = m.hot('-a-b-c-|', {
        a: [
          { index: 2, word: 'Rocks' },
          { index: 0, word: 'RxJS' },
          { index: 1, word: 'Ninja' },
        ],
        b: [
          { index: 1, word: 'Ninja' },
          { index: 2, word: 'Rocks' },
          { index: 0, word: 'RxJS' },
        ],
        c: [
          { index: 2, word: 'Rules' },
          { index: 0, word: 'RxJS' },
          { index: 1, word: 'Ninja' },
        ],
      });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', {
        x: [
          2,
          'Rocks',
          [
            { index: 0, word: 'RxJS' },
            { index: 1, word: 'Ninja' },
            { index: 2, word: 'Rocks' },
          ],
          [
            { index: 2, word: 'Rocks' },
            { index: 0, word: 'RxJS' },
            { index: 1, word: 'Ninja' },
          ],
        ] as BinarySearchResult<string, WordEntry>,
        y: [
          2,
          'Rocks',
          [
            { index: 0, word: 'RxJS' },
            { index: 1, word: 'Ninja' },
            { index: 2, word: 'Rocks' },
          ],
          [
            { index: 1, word: 'Ninja' },
            { index: 2, word: 'Rocks' },
            { index: 0, word: 'RxJS' },
          ],
        ] as BinarySearchResult<string, WordEntry>,
        z: [
          -1,
          'Rocks',
          [
            { index: 0, word: 'RxJS' },
            { index: 1, word: 'Ninja' },
            { index: 2, word: 'Rules' },
          ],
          [
            { index: 2, word: 'Rules' },
            { index: 0, word: 'RxJS' },
            { index: 1, word: 'Ninja' },
          ],
        ] as BinarySearchResult<string, WordEntry>,
      });
      m.expect(input.pipe(binarySearch<string, WordEntry>('Rocks', 'word', sortObj))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should binary search a tuple',
    marbles((m) => {
      const sortTuple: SortFn<NumberTuple> = (a, b) => {
        if (a[1] === b[1]) return 0;
        return a[1] < b[1] ? -1 : 1;
      };

      const input = m.hot('-a-b-c-|', {
        a: [
          [2, 1],
          [10, 5],
          [6, 3],
        ] as NumberTuple[],
        b: [
          [6, 3],
          [10, 5],
          [2, 1],
        ] as NumberTuple[],
        c: [
          [8, 4],
          [10, 5],
          [2, 1],
        ] as NumberTuple[],
      });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', {
        x: [
          1,
          6,
          [
            [2, 1],
            [6, 3],
            [10, 5],
          ],
          [
            [2, 1],
            [10, 5],
            [6, 3],
          ],
        ] as BinarySearchResult<number, [number, number]>,
        y: [
          1,
          6,
          [
            [2, 1],
            [6, 3],
            [10, 5],
          ],
          [
            [6, 3],
            [10, 5],
            [2, 1],
          ],
        ] as BinarySearchResult<number, [number, number]>,
        z: [
          -1,
          6,
          [
            [2, 1],
            [8, 4],
            [10, 5],
          ],
          [
            [8, 4],
            [10, 5],
            [2, 1],
          ],
        ] as BinarySearchResult<number, [number, number]>,
      });
      m.expect(input.pipe(binarySearch<number, NumberTuple>(6, 0, sortTuple))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
