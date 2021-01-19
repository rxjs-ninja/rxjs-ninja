import { outOfRange } from '@rxjs-ninja/rxjs-number';
import { marbles } from 'rxjs-marbles/jest';
import { of } from 'rxjs';

describe('outOfRange', () => {
  it(
    'should filter values excluding the boundary values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: -1, b: 0, c: 1, d: 2, e: 3.14 });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', { w: true, v: false, x: false, y: false, z: true });
      m.expect(input.pipe(outOfRange(0, 2))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should filter values including the boundary values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: -1, b: 0, c: 1, d: 2, e: 3.14 });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', { w: true, v: true, x: false, y: true, z: true });
      m.expect(input.pipe(outOfRange(0, 2, true))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should filter values including the Observable boundary values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: -1, b: 0, c: 1, d: 2, e: 3.14 });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', { w: true, v: true, x: false, y: true, z: true });
      m.expect(input.pipe(outOfRange(of(0), of(2), of(true)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
