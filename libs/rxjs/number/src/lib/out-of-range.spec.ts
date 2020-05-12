import { fromNumber } from '@tinynodes/rxjs-number';
import { outOfRange } from './out-of-range';

describe('outOfRange', () => {
  it('should return false for a value in range with boundaries', (done) => {
    fromNumber(5)
      .pipe(outOfRange(0, 10))
      .subscribe({
        next: (value) => expect(value).toBeFalsy(),
        complete: () => done(),
      });
  });

  it('should return true for a value outside range with boundaries', (done) => {
    fromNumber(10)
      .pipe(outOfRange(0, 10))
      .subscribe({
        next: (value) => expect(value).toBeFalsy(),
        complete: () => done(),
      });
  });

  it('should return false for a value in range within boundaries', (done) => {
    fromNumber(10)
      .pipe(outOfRange(0, 10, true))
      .subscribe({
        next: (value) => expect(value).toBeTruthy(),
        complete: () => done(),
      });
  });

  it('should return true for a value not in range within boundaries', (done) => {
    fromNumber(11)
      .pipe(outOfRange(0, 10, true))
      .subscribe({
        next: (value) => expect(value).toBeTruthy(),
        complete: () => done(),
      });
  });
});
