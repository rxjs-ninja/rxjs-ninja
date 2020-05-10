import { from } from 'rxjs';
import { isFinite } from './is-finite';
import { filter, reduce, take } from 'rxjs/operators';

describe('isFinite', () => {
  it('should return boolean value of value being finite', (done) => {
    from([1, 2, 3, NaN, Infinity, -Infinity, null, '1'])
      .pipe(
        isFinite(),
        filter(Boolean),
        reduce<boolean, boolean[]>((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toHaveLength(3),
        complete: () => done(),
      });
  });
});
