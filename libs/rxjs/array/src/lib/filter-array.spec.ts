import { marbles } from 'rxjs-marbles';
import { filterArray } from './filter-array';

describe('filterArray', () => {
  it(
    'should filter elements using Array.prototype.filter',
    marbles((m) => {
      const input = m.hot('-a-|', { a: [1, 2, 3] });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: [2, 3] });
      m.expect(input.pipe(filterArray((n) => n > 1))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});