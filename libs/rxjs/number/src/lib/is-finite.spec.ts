import { from } from 'rxjs';
import { isFinite } from './is-finite';
import { filterTruthy } from '@tinynodes/rxjs-boolean';

describe('isFinite', () => {
  it('should return if values are finite', done => {
    const output = [];

    from([1, 2, 3, NaN, Infinity, -Infinity, null, '1'])
      .pipe(isFinite(), filterTruthy())
      .subscribe({
        next: value => output.push(value),
        complete: () => {
          expect(output).toHaveLength(3);
          done();
        },
      });
  });
});
