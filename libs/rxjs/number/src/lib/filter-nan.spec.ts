import { marbles } from 'rxjs-marbles/jest';
import { filterNaN } from './filter-nan';

describe('filterIsNotNaN', () => {
  it(
    'should filter values that are not NaN values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: -1, b: 0, c: NaN, d: 2.3, e: 3.14 });
      const subs = '^----------!';
      const expected = m.cold('-a-b---d-e-|', { a: -1, b: 0, d: 2.3, e: 3.14 });
      m.expect(input.pipe(filterNaN())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
