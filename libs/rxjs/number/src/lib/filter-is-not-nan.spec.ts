import { reduce, take } from 'rxjs/operators';
import {} from './filter-is-not-nan';
import { fromNumber, filterIsNotNaN } from '@tinynodes/rxjs-number';

describe('filterIsNotNaN', () => {
  it('should return valid numbers that are integers', (done) => {
    fromNumber([1, 2, NaN, 4])
      .pipe(
        filterIsNotNaN(),
        reduce<number, number[]>((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toStrictEqual([1, 2, 4]),
        complete: () => done(),
      });
  });
});
