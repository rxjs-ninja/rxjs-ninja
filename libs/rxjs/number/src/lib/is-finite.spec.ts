import { from } from 'rxjs';
import { filter, reduce, take } from 'rxjs/operators';
import { isFinite } from '@tinynodes/rxjs-number';

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
