import { from } from 'rxjs';
import { filter, reduce, take } from 'rxjs/operators';
import { isNotNaN } from '@tinynodes/rxjs-number';

describe('isNotNaN', () => {
  it('should return false for NaN value', (done) => {
    from([1, 2, NaN])
      .pipe(
        isNotNaN(),
        filter(Boolean),
        reduce<boolean, boolean[]>((acc, val) => {
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
