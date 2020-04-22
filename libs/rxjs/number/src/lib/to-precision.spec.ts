import { from } from 'rxjs';
import { toPrecision } from './to-precision';

describe('toPrecision', () => {
  it('should return values to a precision', done => {
    const output = [];

    from([123.456, 0.004, 1.23e5])
      .pipe(toPrecision(4))
      .subscribe({
        next: value => output.push(value),
        complete: () => {
          expect(output).toStrictEqual(['123.5', '0.004000', '1.230e+5']);
          done();
        },
      });
  });
});
