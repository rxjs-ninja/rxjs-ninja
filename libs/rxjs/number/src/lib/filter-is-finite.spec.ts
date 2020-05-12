import { from } from 'rxjs';
import { reduce, take } from 'rxjs/operators';
import { filterIsFinite } from '@tinynodes/rxjs-number';

describe('filterIsFinite', () => {
  it('should return valid numbers that are in a finite range', (done) => {
    from([1, 2, 3, NaN, Infinity, -Infinity, null, '1'])
      .pipe(
        filterIsFinite(),
        reduce<number, number[]>((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toStrictEqual([1, 2, 3]),
        complete: () => done(),
      });
  });
});
