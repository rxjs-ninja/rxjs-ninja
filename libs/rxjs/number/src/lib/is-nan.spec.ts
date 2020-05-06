import { from } from 'rxjs';
import { isNaN } from './is-nan';
import { filter } from 'rxjs/operators';

describe('isNan', () => {
  it('should return true for NaN value', (done) => {
    const output = [];

    from([1, 2, '3', null, undefined, NaN, Infinity])
      .pipe(isNaN(), filter(Boolean))
      .subscribe({
        next: (value) => output.push(value),
        complete: () => {
          expect(output).toHaveLength(1);
          done();
        },
      });
  });
});
