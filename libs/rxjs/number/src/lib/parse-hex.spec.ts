import { marbles } from 'rxjs-marbles/jest';
import { parseHex } from './parse-hex';

describe('parseHex', () => {
  it(
    'should return parsed number values and filter NaN values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: 'ff', b: '00', c: '1b', d: 'c89bb', e: 'Ninja' });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', { w: 255, v: 0, x: 27, y: 821691, z: NaN });
      m.expect(input.pipe(parseHex())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
