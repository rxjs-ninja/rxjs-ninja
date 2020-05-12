import { fromNumber } from '@tinynodes/rxjs-number';
import { inRange } from './in-range';
import { filterInRange } from './filter-in-range';
import { take } from 'rxjs/operators';

describe('inRange', () => {
  it('should return number for a value in range with boundaries', (done) => {
    fromNumber(5)
      .pipe(filterInRange(0, 10), take(1))
      .subscribe({
        next: (value) => expect(value).toBe(5),
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
