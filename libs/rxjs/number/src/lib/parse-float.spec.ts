import { marbles } from 'rxjs-marbles/jest';
import { parseFloat } from './parse-float';

describe('parseFloat', () => {
  it(
    'should return parsed number values and filter NaN values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: '-1.5', b: '0', c: '1', d: '2.3', e: '42' });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', { w: -1.5, v: 0, x: 1, y: 2.3, z: 42 });
      m.expect(input.pipe(parseFloat())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return parsed number values and filter NaN values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: '-1.5', b: '0', c: '1', d: '2.3', e: 'Ninja' });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', { w: -1.5, v: 0, x: 1, y: 2.3, z: NaN });
      m.expect(input.pipe(parseFloat())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
