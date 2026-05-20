import { marbles } from 'rxjs-marbles';
import { copyWithin } from './copy-within';

describe('copyWithin', () => {
  it(
    'should copy a slice within the array',
    marbles((m) => {
      const input = m.hot('-a-|', { a: [1, 2, 3, 4] });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: [3, 4, 3, 4] });
      m.expect(input.pipe(copyWithin(0, 2))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});