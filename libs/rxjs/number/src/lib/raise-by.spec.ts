import { marbles } from 'rxjs-marbles/jest';
import { raiseBy } from '@rxjs-ninja/rxjs-number';
import { of } from 'rxjs';

describe('raiseBy', () => {
  it(
    'should return number raised by the passed value',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: 2, b: 5, c: 10, d: 16, e: 256 });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', { w: 4, v: 25, x: 100, y: 256, z: 65536 });
      m.expect(input.pipe(raiseBy(2))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return number raised by the passed value as Observable',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: 2, b: 5, c: 10, d: 16, e: 256 });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', { w: 4, v: 25, x: 100, y: 256, z: 65536 });
      m.expect(input.pipe(raiseBy(of(2)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
