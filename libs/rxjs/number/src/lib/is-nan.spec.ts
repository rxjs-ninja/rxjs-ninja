import { from } from 'rxjs';
import { isNaN } from './is-nan';
import { filterTruthy } from '@tinynodes/rxjs-boolean';

describe('isNan', () => {
  it('should return true for NaN value', done => {
    const output = [];

    from([1, 2, '3', null, undefined, NaN, Infinity])
      .pipe(isNaN(), filterTruthy())
      .subscribe({
        next: value => output.push(value),
        complete: () => {
          expect(output).toHaveLength(1);
          done();
        },
      });
  });
});
