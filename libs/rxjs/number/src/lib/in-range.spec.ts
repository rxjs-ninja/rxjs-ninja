import { fromNumber, inRange } from '@tinynodes/rxjs-number';

describe('inRange', () => {
  it('should return true for a value in range with boundaries', (done) => {
    fromNumber(5)
      .pipe(inRange(0, 10))
      .subscribe({
        next: (value) => expect(value).toBeTruthy(),
        complete: () => done(),
      });
  });

  it('should return false for a value outside range with boundaries', (done) => {
    fromNumber(10.1)
      .pipe(inRange(0, 10))
      .subscribe({
        next: (value) => expect(value).toBeFalsy(),
        complete: () => done(),
      });
  });

  it('should return true for a value in range within boundaries', (done) => {
    fromNumber(9.9)
      .pipe(inRange(0, 10, true))
      .subscribe({
        next: (value) => expect(value).toBeTruthy(),
        complete: () => done(),
      });
  });

  it('should return false for a value not in range within boundaries', (done) => {
    fromNumber(10)
      .pipe(inRange(0, 10, true))
      .subscribe({
        next: (value) => expect(value).toBeFalsy(),
        complete: () => done(),
      });
  });
});
