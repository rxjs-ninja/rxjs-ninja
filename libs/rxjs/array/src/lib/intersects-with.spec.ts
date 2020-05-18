import { of } from 'rxjs';
import { intersectsWith } from './intersects-with';

describe('intersectsWith', () => {
  it('should return an array of string items that intersect with no predicate', (done) => {
    of(['a', 'b', 'c', 'd'])
      .pipe(intersectsWith(['a', 'c']))
      .subscribe({
        next: (value) => expect(value).toStrictEqual(['a', 'c']),
        complete: () => done(),
      });
  });

  it('should return an array of number items that intersect with no predicate', (done) => {
    of([1, 2, 3, 4])
      .pipe(intersectsWith([1, 3]))
      .subscribe({
        next: (value) => expect(value).toStrictEqual([1, 3]),
        complete: () => done(),
      });
  });

  it('should return an array of string items that intersect with predicate', (done) => {
    of(['a', 'b', 'c', 'd'])
      .pipe(intersectsWith(['A', 'C'], (x, y) => x === y.toLowerCase()))
      .subscribe({
        next: (value) => expect(value).toStrictEqual(['a', 'c']),
        complete: () => done(),
      });
  });
});
