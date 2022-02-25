import { marbles } from 'rxjs-marbles/jest';
import { toHex } from './to-hex';

describe('toHex', () => {
  it(
    'should return a hex string of source number',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: 2, b: 16, c: 255, d: 75, e: 42 });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', {
        w: '2',
        v: '10',
        x: 'ff',
        y: '4b',
        z: '2a',
      });
      m.expect(input.pipe(toHex())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
