import { isInteger } from '@tinynodes/rxjs-number';
import { filter, reduce, take } from 'rxjs/operators';
import { fromNumber } from './from-number';

describe('isInteger', () => {
  it('should return true for an integer', (done) => {
    fromNumber([1, 2, 3.14])
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
