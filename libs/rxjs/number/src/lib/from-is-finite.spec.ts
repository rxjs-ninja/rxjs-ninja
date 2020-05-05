import { from } from 'rxjs';
import { fromIsFinite } from './from-is-finite';

describe('fromIsFinite', () => {
  it('should return numbers that are finite', (done) => {
    const output = [];

    from([1, 2, 3, NaN, Infinity, -Infinity, null, '1'])
      .pipe(fromIsFinite())
      .subscribe({
        next: (value) => output.push(value),
        complete: () => {
          expect(output).toStrictEqual([1, 2, 3]);
          done();
        },
      });
  });
});
