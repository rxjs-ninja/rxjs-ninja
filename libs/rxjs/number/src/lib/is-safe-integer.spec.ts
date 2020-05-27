import { isSafeInteger } from './is-safe-integer';
import { marbles } from 'rxjs-marbles/jest';

describe('isSafeInteger', () => {
  it(
    'should filter values that are safe integer only',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-f-', {
        a: Infinity,
        b: -1,
        c: 0,
        d: Math.pow(2, 53),
        e: Math.pow(2, 53) - 1,
        f: 3.14,
      });
      const expected = m.cold('-a-b-c-d-e-f-', { a: false, b: true, c: true, d: false, e: true, f: false });
      m.expect(input.pipe(isSafeInteger())).toBeObservable(expected);
    }),
  );
});
