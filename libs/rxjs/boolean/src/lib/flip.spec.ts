import { marbles } from 'rxjs-marbles/jest';
import { flip } from './flip';

describe('flip', () => {
  it(
    'should return a flipped value',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: false, b: true, c: false });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: true, y: false, z: true });
      m.expect(input.pipe(flip())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
