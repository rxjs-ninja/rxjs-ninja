import { filterInRange, fromNumber } from '@tinynodes/rxjs-number';
import { reduce, take } from 'rxjs/operators';

describe('filterInRange', () => {
  it('should return a number value that falls within a boundary', (done) => {
    fromNumber(5)
      .pipe(filterInRange(0, 10), take(1))
      .subscribe({
        next: (value) => expect(value).toBe(5),
        complete: () => done(),
      });
  });

  it('should return number values that falls within a boundary', (done) => {
    fromNumber([-1, 0, 1, 2, 3])
      .pipe(
        filterInRange(0, 10),
        reduce((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
      )
      .subscribe({
        next: (value) => expect(value).toStrictEqual([0, 1, 2, 3]),
        complete: () => done(),
      });
  });

  it('should return false for a value outside range with boundaries', (done) => {
    let count = 0;
    fromNumber(10.1)
      .pipe(filterInRange(0, 10), take(1))
      .subscribe({
        next: () => count++,
        complete: () => {
          expect(count).toBe(0);
          done();
        },
      });
  });

  it('should return number for a value in range within boundaries', (done) => {
    fromNumber(9.9)
      .pipe(filterInRange(0, 10, true))
      .subscribe({
        next: (value) => expect(value).toBe(9.9),
        complete: () => done(),
      });
  });

  it('should return false for a value not in range within boundaries', (done) => {
    let count = 0;
    fromNumber(10)
      .pipe(filterInRange(0, 10, true), take(1))
      .subscribe({
        next: () => count++,
        complete: () => {
          expect(count).toBe(0);
          done();
        },
      });
  });
});
