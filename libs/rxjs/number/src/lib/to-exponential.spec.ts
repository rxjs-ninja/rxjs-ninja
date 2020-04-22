import { from } from 'rxjs';
import { toExponential } from './to-exponential';

describe('toExponential', () => {
  it('should raise a number to its power', done => {
    const output = [];

    from([1000, 2000, 3000])
      .pipe(toExponential(2))
      .subscribe({
        next: value => output.push(value),
        complete: () => {
          expect(output).toStrictEqual(['1.00e+3', '2.00e+3', '3.00e+3']);
          done();
        },
      });
  });
});
