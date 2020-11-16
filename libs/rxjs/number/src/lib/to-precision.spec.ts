import { toPrecision } from './to-precision';
import { marbles } from 'rxjs-marbles/jest';

describe('toPrecision', () => {
  it(
    'should return string of a locale formatted number',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-', { a: -1, b: 0.004, c: 123.456, d: 1.23e5, e: 3.14 });
      const expected = m.cold('-w-v-x-y-z-', {
        w: '-1.000',
        v: '0.004000',
        x: '123.5',
        y: '1.230e+5',
        z: '3.140',
      });
      m.expect(input.pipe(toPrecision(4))).toBeObservable(expected);
    }),
  );
});
