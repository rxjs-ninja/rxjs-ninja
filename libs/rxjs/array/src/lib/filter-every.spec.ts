import { marbles } from 'rxjs-marbles';
import { filterEvery } from '@rxjs-ninja/rxjs-array';

describe('filterEvery', () => {
  it(
    'should return the array if the array contains values that pass the predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [1, 0, 1, 0, 1, 0], b: [1, 0, 2, 1, 0, 2], c: [0, 1, 0, 1, 0, 2] });
      const subs = '^------!';
      const expected = m.cold('-x-----|', { x: [1, 0, 1, 0, 1, 0] });
      m.expect(input.pipe(filterEvery((v) => v < 2))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
