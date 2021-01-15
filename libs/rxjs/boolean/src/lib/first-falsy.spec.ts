import { firstFalsy } from '@rxjs-ninja/rxjs-boolean';
import { marbles } from 'rxjs-marbles/jest';

describe('firstFalsy', () => {
  it(
    'filter the first falsy value with predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-', { a: 2, b: 4, c: 5, d: 6, e: 7 });
      const subs = '^----!';
      const expected = m.cold('-----(c|)', { c: 5 });
      m.expect(input.pipe(firstFalsy((num: number) => num % 2 === 0))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
