import { marbles } from 'rxjs-marbles/jest';
import { add } from '@rxjs-ninja/rxjs-number';
import { of } from 'rxjs';

describe('add', () => {
  it(
    'should return the remainder of mod 3',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: 2, b: 3, c: 4, d: 5, e: 6 });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', { w: 5, v: 6, x: 7, y: 8, z: 9 });
      m.expect(input.pipe(add(3))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the remainder of mod 3 as Observable value',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: 2, b: 3, c: 4, d: 5, e: 6 });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', { w: 5, v: 6, x: 7, y: 8, z: 9 });
      m.expect(input.pipe(add(of(3)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
