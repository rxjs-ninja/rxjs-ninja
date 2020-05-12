import { isNaN } from './is-nan';
import { filter, reduce, take } from 'rxjs/operators';
import { fromNumber } from './from-number';

describe('isNaN', () => {
  it('should return true for NaN value', (done) => {
    fromNumber([1, 2, NaN, Infinity])
      .pipe(
        isNaN(),
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
