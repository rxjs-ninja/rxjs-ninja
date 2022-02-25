import { marbles } from 'rxjs-marbles/jest';
import { max } from './max';

describe('max', () => {
  it(
    'should return the maximum number in the passed array',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [1, 2, 3], b: [-1, 0, 1], c: [-10, -1, -5] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 3, y: 1, z: -1 });
      m.expect(input.pipe(max())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
