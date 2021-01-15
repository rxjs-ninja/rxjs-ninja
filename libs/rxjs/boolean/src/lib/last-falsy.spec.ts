import { lastFalsy } from '@rxjs-ninja/rxjs-boolean';
import { marbles } from 'rxjs-marbles/jest';

describe('lastFalsy', () => {
  it(
    'should filter the last truthy item with predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: 2, b: 3, c: 5, d: 6, e: 8 });
      const subs = '^----------!';
      const expected = m.cold('-----------(c|)', { c: 5 });
      m.expect(input.pipe(lastFalsy((num: number) => num % 2 === 0))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
