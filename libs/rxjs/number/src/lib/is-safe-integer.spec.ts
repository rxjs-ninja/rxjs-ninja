import { from } from 'rxjs';
import { isSafeInteger } from './is-safe-integer';
import { filter, reduce, take } from 'rxjs/operators';
import { fromNumber } from '@tinynodes/rxjs-number';

describe('isSafeInteger', () => {
  it('should return if a value is a safe integer', (done) => {
    fromNumber([Math.pow(2, 53), Math.pow(2, 53) - 1])
      .pipe(
        isSafeInteger(),
        filter(Boolean),
        reduce<boolean, boolean[]>((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toHaveLength(1),
        complete: () => done(),
      });
  });
});
