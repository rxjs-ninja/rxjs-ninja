import { toPrecision } from './to-precision';
import { reduce, take } from 'rxjs/operators';
import { fromNumber } from '@tinynodes/rxjs-number';

describe('toPrecision', () => {
  it('should return string values of numbers formatted to the passed precision', (done) => {
    fromNumber([123.456, 0.004, 1.23e5])
      .pipe(
        toPrecision(4),
        reduce<string, string[]>((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toStrictEqual(['123.5', '0.004000', '1.230e+5']),
        complete: () => done(),
      });
  });
});
