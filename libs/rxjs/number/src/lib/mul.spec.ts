import { marbles } from 'rxjs-marbles/jest';
import { mul } from '@rxjs-ninja/rxjs-number';
import { of } from 'rxjs';

describe('mul', () => {
  it(
    'should return the remainder of mod 3',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: 2, b: 3, c: 4, d: 5, e: 6 });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', { w: 4, v: 6, x: 8, y: 10, z: 12 });
      m.expect(input.pipe(mul(2))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the remainder of mod 3 as Observable value',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: 2, b: 3, c: 4, d: 5, e: 6 });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', { w: 4, v: 6, x: 8, y: 10, z: 12 });
      m.expect(input.pipe(mul(of(2)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
