import { parseFloat, parseInt } from '@rxjs-ninja/rxjs-number';
import { marbles } from 'rxjs-marbles/jest';

describe('parseFloat', () => {
  it(
    'should return parsed number values and filter NaN values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: '-1.5', b: '0', c: '1', d: '2.3', e: 'Ninja' });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y---|', { w: -1.5, v: 0, x: 1, y: 2.3 });
      m.expect(input.pipe(parseFloat())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return parsed number values and return NaN values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: '-1.5', b: '0', c: '1', d: '2.3', e: 'Ninja' });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', { w: -1.5, v: 0, x: 1, y: 2.3, z: NaN });
      m.expect(input.pipe(parseFloat(true))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
