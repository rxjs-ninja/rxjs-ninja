import { from } from 'rxjs';
import { isFinite } from './is-finite';
import { reduce } from 'rxjs/operators';
import { filterTruthy } from '@tinynodes/rxjs-boolean';

describe('isFinite', () => {
  it('should return if values are finite', (done) => {
    from([1, 2, 3, NaN, Infinity, -Infinity, null, '1'])
      .pipe(
        isFinite(),
        filterTruthy(),
        reduce((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
      )
      .subscribe({
        next: (value) => expect(value).toHaveLength(3),
        complete: () => done(),
      });
  });
});
