import { from, of } from 'rxjs';
import { binarySearch } from './binary-search';
import { take } from 'rxjs/operators';

describe('binarySearch', () => {
  it('should binary search a single array', (done) => {
    of([1, 4, 7, 2, 5, 6, 3, 8, 10, 9])
      .pipe(binarySearch(5), take(1))
      .subscribe({
        next: (value) => expect(value.index).toBe(4),
        complete: () => done(),
      });
  });

  it('should binary search a multiple values', (done) => {
    from([1, 4, 7, 2, 5, 6, 3, 8, 10, 9])
      .pipe(binarySearch(10), take(1))
      .subscribe({
        next: (value) => expect(value.index).toBe(9),
        complete: () => done(),
      });
  });

  it('should binary search with object types', (done) => {
    const sort = (a: { val: number }, b: { val: number }) => {
      if (a.val === b.val) return 0;
      return a.val < b.val ? -1 : 1;
    };

    of([{ val: 1 }, { val: 4 }, { val: 7 }, { val: 2 }, { val: 5 }, { val: 6 }, { val: 3 }, { val: 8 }, { val: 10 }, { val: 9 }])
      .pipe(binarySearch<{ val: number }, number>(5, sort, 'val'), take(1))
      .subscribe({
        next: (value) => expect(value.index).toBe(4),
        complete: () => done(),
      });
  });

  it('should binary search with array types', (done) => {
    const sort = (a: [number, number], b: [number, number]) => {
      if (a[1] === b[1]) return 0;
      return a[1] < b[1] ? -1 : 1;
    };

    of<[number, number][]>([
      [1, 1],
      [2, 4],
      [3, 7],
      [4, 2],
      [5, 5],
      [6, 6],
      [7, 3],
      [8, 8],
      [9, 10],
      [10, 9],
    ])
      .pipe(binarySearch<[number, number], number>(5, sort, 1), take(1))
      .subscribe({
        next: (value) => expect(value.index).toBe(4),
        complete: () => done(),
      });
  });
});
