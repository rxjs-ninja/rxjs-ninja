import { filterFalsy } from '@rxjs-ninja/rxjs-boolean';
import { marbles } from 'rxjs-marbles/jest';

describe('filterFalsy', () => {
  it(
    'should filter a source of truthy values with predicate',
    marbles((m) => {
      const predicate = (num: number): boolean => num % 2 === 0;
      const input = m.hot('-a-b-c-d-e-|', { a: 0, b: 1, c: 2, d: 3, e: 4 });
      const subs = '^----------!';
      const expected = m.cold('---b---d---|', { b: 1, d: 3 });
      m.expect(input.pipe(filterFalsy(predicate))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
