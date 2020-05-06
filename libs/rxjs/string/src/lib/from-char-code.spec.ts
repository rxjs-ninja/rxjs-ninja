import { from } from 'rxjs';
import { reduce, take } from 'rxjs/operators';
import { fromCharCode } from './from-char-code';

describe('fromCharCode', () => {
  it('should create a value from an array of values', (done) => {
    from([35, 36, 37, 38])
      .pipe(
        reduce((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
        fromCharCode(),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toBe('#$%&'),
        complete: () => done(),
      });
  });
});
