import { from } from 'rxjs';
import { isFinite } from './is-finite';
import { filter, reduce } from 'rxjs/operators';

describe('isFinite', () => {
  it('should return if values are finite', (done) => {
    from([1, 2, 3, NaN, Infinity, -Infinity, null, '1'])
      .pipe(
        isFinite(),
        filter(Boolean),
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
