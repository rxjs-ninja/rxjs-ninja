import { of } from 'rxjs';
import { binarySearch } from './binary-search';
import { tap } from 'rxjs/operators';
import { observe } from 'rxjs-marbles/jest';
import { SortFn } from '@tinynodes/rxjs/array';

describe('binarySearch', () => {
  type TestObj = { val: number };

  const sortObj: SortFn<TestObj> = (a: TestObj, b: TestObj) => {
    if (a.val === b.val) return 0;
    return a.val < b.val ? -1 : 1;
  };

  const sortArray = (a: [number, number], b: [number, number]) => {
    if (a[1] === b[1]) return 0;
    return a[1] < b[1] ? -1 : 1;
  };

  it(
    'should binary search a single array of numbers',
    observe(() =>
      of([1, 4, 7, 2, 5, 6, 3, 8, 10, 9]).pipe(
        binarySearch(5),
        tap((value) => expect(value[0]).toBe(4)),
      ),
    ),
  );

  it(
    'should binary search a single array of strings',
    observe(() =>
      of(['b', 'c', 'd', 'a', 'g', 'f', '34', '2']).pipe(
        binarySearch('d'),
        tap((value) => expect(value[0]).toBe(5)),
      ),
    ),
  );

  it(
    'should binary search a single array of objects',
    observe(() =>
      of([
        { val: 1 },
        { val: 4 },
        { val: 7 },
        { val: 2 },
        { val: 5 },
        { val: 6 },
        { val: 3 },
        { val: 8 },
        { val: 10 },
        { val: 9 },
      ]).pipe(
        binarySearch(5, sortObj, 'val'),
        tap((value) => expect(value[0]).toBe(4)),
      ),
    ),
  );

  it(
    'should binary search a single array of tuples',
    observe(() =>
      of([
        [10, 1],
        [9, 4],
        [7, 7],
        [8, 2],
        [5, 5],
        [6, 6],
        [4, 3],
        [3, 8],
        [2, 10],
        [1, 9],
      ]).pipe(
        binarySearch(4, sortArray, 0),
        tap((value) => expect(value[0]).toBe(2)),
      ),
    ),
  );
});
