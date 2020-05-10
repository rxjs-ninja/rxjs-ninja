import { from } from 'rxjs';
import { isInteger } from './is-integer';
import { filter, reduce, take } from 'rxjs/operators';

describe('isInteger', () => {
  it('should return true for an integer', (done) => {
    from([1, 2, 3.14, '2', false, true, null])
      .pipe(
        isInteger(),
        filter(Boolean),
        reduce((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toHaveLength(2),
        complete: () => done(),
      });
  });
});
