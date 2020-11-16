import { filterIsInteger } from '@tinynodes/rxjs-number';
import { marbles } from 'rxjs-marbles/jest';

describe('filterIsInteger', () => {
  it(
    'should filter values that are integer only',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: -1, b: 0, c: 1, d: 2.3, e: 3.14 });
      const subs = '^----------!';
      const expected = m.cold('-a-b-c-----|', { a: -1, b: 0, c: 1 });
      m.expect(input.pipe(filterIsInteger())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
