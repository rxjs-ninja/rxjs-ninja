import { toExponential } from './to-exponential';
import { marbles } from 'rxjs-marbles/jest';

describe('toExponential', () => {
  it(
    'should return string of value raised to power',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-', { a: -1, b: 0, c: 1, d: 2.3, e: 3.14 });
      const expected = m.cold('-w-v-x-y-z-', {
        w: '-1.00e+0',
        v: '0.00e+0',
        x: '1.00e+0',
        y: '2.30e+0',
        z: '3.14e+0',
      });
      m.expect(input.pipe(toExponential(2))).toBeObservable(expected);
    }),
  );
});
