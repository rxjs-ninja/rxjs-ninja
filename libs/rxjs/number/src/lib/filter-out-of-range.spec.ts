import { fromNumber } from '@tinynodes/rxjs-number';
import { outOfRange } from './out-of-range';
import { filterOutOfRange } from './filter-out-of-range';
import { take } from 'rxjs/operators';

describe('filterOutOfRange', () => {
  it('should return false for a value in range with boundaries', (done) => {
    let count = 0;
    fromNumber(5)
      .pipe(filterOutOfRange(0, 10), take(1))
      .subscribe({
        next: () => count++,
        complete: () => {
          expect(count).toBe(0);
          done();
        },
      });
  });

  it('should return true for a value outside range with boundaries', (done) => {
    fromNumber(10)
      .pipe(filterOutOfRange(0, 10), take(1))
      .subscribe({
        next: (value) => expect(value).toBe(10),
        complete: () => done(),
      });
  });

  it('should return false for a value in range within boundaries', (done) => {
    let count = 0;
    fromNumber(9.9)
      .pipe(filterOutOfRange(0, 10, true), take(1))
      .subscribe({
        next: (value) => count++,
        complete: () => {
          expect(count).toBe(0);
          done();
        },
      });
  });

  it('should return true for a value not in range within boundaries', (done) => {
    fromNumber(11)
      .pipe(filterOutOfRange(0, 10, true))
      .subscribe({
        next: (value) => expect(value).toBe(11),
        complete: () => done(),
      });
  });
});
