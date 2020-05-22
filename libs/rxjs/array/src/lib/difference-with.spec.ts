import { of } from 'rxjs';
import { intersectsWith } from './intersects-with';
import { differenceWith } from './difference-with';

describe('differenceWith', () => {
  it('should return an array of string items that intersect with no predicate', (done) => {
    of(['a', 'b', 'c', 'd'])
      .pipe(differenceWith(['a', 'c']))
      .subscribe({
        next: (value) => expect(value).toStrictEqual(['b', 'd']),
        complete: () => done(),
      });
  });

  it('should return an array of number items that intersect with no predicate', (done) => {
    of([1, 2, 3, 4])
      .pipe(differenceWith([1, 3]))
      .subscribe({
        next: (value) => expect(value).toStrictEqual([2, 4]),
        complete: () => done(),
      });
  });

  it('should return an array of string items that intersect with predicate', (done) => {
    of(['a', 'b', 'c', 'd'])
      .pipe(differenceWith(['A', 'C'], (x, y) => x === y.toLowerCase()))
      .subscribe({
        next: (value) => expect(value).toStrictEqual(['b', 'd']),
        complete: () => done(),
      });
  });

  it('should return an array of string items that intersect with no predicate for observable', (done) => {
    of(['a', 'b', 'c', 'd'])
      .pipe(differenceWith(of(['a', 'c'])))
      .subscribe({
        next: (value) => expect(value).toStrictEqual(['b', 'd']),
        complete: () => done(),
      });
  });

  it('should return an array of string items that intersect with predicate for observable', (done) => {
    of(['a', 'b', 'c', 'd'])
      .pipe(differenceWith(of(['A', 'C']), (x, y) => x === y.toLowerCase()))
      .subscribe({
        next: (value) => expect(value).toStrictEqual(['b', 'd']),
        complete: () => done(),
      });
  });
});
