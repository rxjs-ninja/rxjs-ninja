import { of } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';
import { sub } from './sub';

describe('sub', () => {
  it(
    'should return the remainder of mod 3',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: 2, b: 3, c: 4, d: 5, e: 6 });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', { w: -1, v: 0, x: 1, y: 2, z: 3 });
      m.expect(input.pipe(sub(3))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the remainder of mod 3 as Observable value',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: 2, b: 3, c: 4, d: 5, e: 6 });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', { w: -1, v: 0, x: 1, y: 2, z: 3 });
      m.expect(input.pipe(sub(of(3)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
