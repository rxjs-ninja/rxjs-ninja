import { from } from 'rxjs';
import { isInteger } from './is-integer';
import { filterTruthy } from '@tinynodes/rxjs-boolean';

describe('isInteger', () => {
  it('should return true for an integer', done => {
    const output = [];

    from([1, 2, 3.14, '2', false, true, null])
      .pipe(isInteger(), filterTruthy())
      .subscribe({
        next: value => output.push(value),
        complete: () => {
          expect(output).toHaveLength(2);
          done();
        },
      });
  });
});
