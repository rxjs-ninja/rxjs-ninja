import { marbles } from 'rxjs-marbles/jest';
import { min } from './min';

describe('min', () => {
  it(
    'should return the min number in the passed array',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [1, 2, 3], b: [-1, 0, 1], c: [-10, -1, -5] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 1, y: -1, z: -10 });
      m.expect(input.pipe(min())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
