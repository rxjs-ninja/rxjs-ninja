import { take } from 'rxjs/operators';
import { fromString, trimString } from '@tinynodes/rxjs-string';
import { TrimPosition } from '../types/position';

describe('trim string', () => {
  it('should trim a string at both ends by default', (done) => {
    fromString('  this is a test  ')
      .pipe(trimString(), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('this is a test'),
        complete: () => done(),
      });
  });

  it('should trim a string on the left only', (done) => {
    fromString('  this is a test  ')
      .pipe(trimString(TrimPosition.START), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('this is a test  '),
        complete: () => done(),
      });
  });

  it('should trim a string on the right only', (done) => {
    fromString('  this is a test  ')
      .pipe(trimString(TrimPosition.END), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('  this is a test'),
        complete: () => done(),
      });
  });
});
