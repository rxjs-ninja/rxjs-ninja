import { from } from 'rxjs';
import { toExponential } from './to-exponential';
import { reduce, take } from 'rxjs/operators';
import { fromNumber } from '@tinynodes/rxjs-number';

describe('toExponential', () => {
  it('should raise a number by the exponential passed and return a string', (done) => {
    fromNumber([1000, 2000, 3000])
      .pipe(
        toExponential(2),
        reduce<string, string[]>((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toStrictEqual(['1.00e+3', '2.00e+3', '3.00e+3']),
        complete: () => done(),
      });
  });
});
