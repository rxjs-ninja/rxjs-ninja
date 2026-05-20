import { marbles } from 'rxjs-marbles';
import { toReversed } from './to-reversed';

describe('toReversed', () => {
  it(
    'should return a reversed copy of the array',
    marbles((m) => {
      const input = m.hot('-a-|', { a: [1, 2, 3, 4] });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: [4, 3, 2, 1] });
      m.expect(input.pipe(toReversed())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});