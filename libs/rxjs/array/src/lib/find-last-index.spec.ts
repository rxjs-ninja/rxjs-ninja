import { marbles } from 'rxjs-marbles';
import { findLastIndex } from './find-last-index';

describe('findLastIndex', () => {
  it(
    'should return the last index matching the predicate',
    marbles((m) => {
      const input = m.hot('-a-|', { a: [1, 2, 3, 4, 5] });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: 4 });
      m.expect(input.pipe(findLastIndex((v) => v > 2))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
