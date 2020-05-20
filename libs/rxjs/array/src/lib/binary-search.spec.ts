import { from, of } from 'rxjs';
import { binarySearch } from './binary-search';
import { take } from 'rxjs/operators';

describe('binarySearch', () => {
  it('should binary search a single array', (done) => {
    of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      .pipe(binarySearch(5), take(1))
      .subscribe({
        next: (value) => expect(value.index).toBe(4),
        complete: () => done(),
      });
  });

  it('should binary search a multiple values', (done) => {
    from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      .pipe(binarySearch(10), take(1))
      .subscribe({
        next: (value) => expect(value.index).toBe(9),
        complete: () => done(),
      });
  });
});
