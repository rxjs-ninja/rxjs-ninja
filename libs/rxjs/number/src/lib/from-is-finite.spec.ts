import { from } from 'rxjs';
import { reduce } from 'rxjs/operators';
import { fromIsFinite } from './from-is-finite';

describe('fromIsFinite', () => {
  it('should return numbers that are finite', (done) => {
    from([1, 2, 3, NaN, Infinity, -Infinity, null, '1'])
      .pipe(
        fromIsFinite(),
        reduce((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
      )
      .subscribe({
        next: (value) => expect(value).toStrictEqual([1, 2, 3]),
        complete: () => done(),
      });
  });
});
