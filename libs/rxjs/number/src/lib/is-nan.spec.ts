import { from } from 'rxjs';
import { isNaN } from './is-nan';
import { filter, reduce, take } from 'rxjs/operators';

describe('isNaN', () => {
  it('should return true for NaN value', (done) => {
    from([1, 2, '3', null, undefined, NaN, Infinity])
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
