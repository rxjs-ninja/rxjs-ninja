import { take } from 'rxjs/operators';
import { toString } from './to-string';
import { fromNumber } from './from-number';

describe('toString', () => {
  it('should convert a number to a default base 10 string', (done) => {
    fromNumber(10)
      .pipe(toString(), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('10'),
        complete: () => done(),
      });
  });

  it('should convert a number to hex radix string', (done) => {
    fromNumber(255)
      .pipe(toString(16), take(1))
      .subscribe({
        next: (value) => expect(value).toBe('ff'),
        complete: () => done(),
      });
  });
});
