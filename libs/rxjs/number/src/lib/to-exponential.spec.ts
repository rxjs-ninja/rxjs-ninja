import { toExponential } from './to-exponential';
import { take } from 'rxjs/operators';
import { fromNumber } from '@tinynodes/rxjs-number';

describe('toExponential', () => {
  it('should raise a number by the exponential passed and return a string', (done) => {
    fromNumber(1.2)
      .pipe(toExponential(2), take(1))
      .subscribe({
        next: (value) => expect(value).toStrictEqual('1.20e+0'),
        complete: () => done(),
      });
  });
});
