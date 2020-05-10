import { from } from 'rxjs';
import { filterIsSafeInteger } from './filter-is-safe-integer';
import { reduce, take } from 'rxjs/operators';

describe('filterIsSafeInteger', () => {
  it('should return valid numbers that are in a safe integers', (done) => {
    from([1, 2, Math.pow(2, 53), Math.pow(2, 53) - 1])
      .pipe(
        filterIsSafeInteger(),
        reduce<number, number[]>((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toStrictEqual([1, 2, 9007199254740991]),
        complete: () => done(),
      });
  });
});
