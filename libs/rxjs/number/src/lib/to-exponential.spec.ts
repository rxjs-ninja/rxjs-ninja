import { of } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';
import { toExponential } from './to-exponential';

describe('toExponential', () => {
  it(
    'should return string of value raised to power of 2',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: -1, b: 0, c: 1, d: 2.3, e: 3.14 });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', {
        w: '-1.00e+0',
        v: '0.00e+0',
        x: '1.00e+0',
        y: '2.30e+0',
        z: '3.14e+0',
      });
      m.expect(input.pipe(toExponential(2))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return string of value raised to power of 5',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: 1, b: 10, c: 100, d: 1000, e: 1000000 });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', {
        w: '1.00000e+0',
        v: '1.00000e+1',
        x: '1.00000e+2',
        y: '1.00000e+3',
        z: '1.00000e+6',
      });
      m.expect(input.pipe(toExponential(5))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return string of value raised to power of 5 as Observable',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: 1, b: 10, c: 100, d: 1000, e: 1000000 });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', {
        w: '1.00000e+0',
        v: '1.00000e+1',
        x: '1.00000e+2',
        y: '1.00000e+3',
        z: '1.00000e+6',
      });
      m.expect(input.pipe(toExponential(of(5)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
