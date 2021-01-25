import { roundTo } from '@rxjs-ninja/rxjs-number';
import { marbles } from 'rxjs-marbles/jest';
import { of } from 'rxjs';

describe('toFixed', () => {
  it(
    'should return a string of a number with 2 decimal places',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: 1.1234, b: 1.1287, c: 1, d: 2.3, e: 3.14 });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', {
        w: 1.12,
        v: 1.13,
        x: 1,
        y: 2.3,
        z: 3.14,
      });
      m.expect(input.pipe(roundTo(2))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a string of a Observable number with 2 decimal places',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: 1.1234, b: 1.1287, c: 1, d: 2.3, e: 3.14 });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', {
        w: 1.12,
        v: 1.13,
        x: 1,
        y: 2.3,
        z: 3.14,
      });
      m.expect(input.pipe(roundTo(of(2)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
