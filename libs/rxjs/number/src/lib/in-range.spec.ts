import { of } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';
import { inRange } from './in-range';

describe('inRange', () => {
  it(
    'should filter values including the boundary values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: -1, b: 0, c: 1, d: 2, e: 3.14 });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', { w: false, v: true, x: true, y: true, z: false });
      m.expect(input.pipe(inRange(0, 2))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should filter values excluding the boundary values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: -1, b: 0, c: 1, d: 2, e: 3.14 });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', { w: false, v: false, x: true, y: false, z: false });
      m.expect(input.pipe(inRange(0, 2, true))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should filter values excluding the Observable boundary values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: -1, b: 0, c: 1, d: 2, e: 3.14 });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', { w: false, v: false, x: true, y: false, z: false });
      m.expect(input.pipe(inRange(of(0), of(2), of(true)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
