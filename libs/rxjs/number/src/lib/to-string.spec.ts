import { from } from 'rxjs';
import { toString } from './to-string';
import { take } from 'rxjs/operators';

describe('toString', () => {
  it('should convert a number to a default base 10 string', done => {
    from([10])
      .pipe(toString(), take(1))
      .subscribe({
        next: value => expect(value).toBe('10'),
        complete: () => done(),
      });
  });

  it('should convert a number to hex radix string', done => {
    from([255])
      .pipe(toString(16), take(1))
      .subscribe({
        next: value => expect(value).toBe('ff'),
        complete: () => done(),
      });
  });
});
