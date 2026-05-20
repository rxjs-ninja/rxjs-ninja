import { marbles } from 'rxjs-marbles';
import { toSorted } from './to-sorted';

describe('toSorted', () => {
  it(
    'should return a sorted copy of the array',
    marbles((m) => {
      const input = m.hot('-a-|', { a: [1, 2, 3, 4] });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: [1, 2, 3, 4] });
      m.expect(input.pipe(toSorted())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});