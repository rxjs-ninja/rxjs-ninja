import { filterTruthy } from './filter-truthy';
import { marbles } from 'rxjs-marbles/jest';

describe('filterTruthy', () => {
  it(
    'should filter a source of truthy values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-(e|)', { a: '', b: 'true', c: 'true', d: '', e: 'true' });
      const subs = '^--------!';
      const expected = m.cold('---b-c---(e|)', { b: 'true', c: 'true', e: 'true' });
      m.expect(input.pipe(filterTruthy())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should filter a source of truthy values with predicate',
    marbles((m) => {
      const predicate = (num: number): boolean => num % 2 === 0;
      const input = m.hot('-a-b-c-d-(e|)', { a: 0, b: 1, c: 2, d: 3, e: 4 });
      const subs = '^--------!';
      const expected = m.cold('-a---c---(e|)', { a: 0, c: 2, e: 4 });
      m.expect(input.pipe(filterTruthy(predicate))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
