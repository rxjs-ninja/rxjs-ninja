import { filterIsSafeInteger } from '@rxjs-ninja/rxjs-number';
import { marbles } from 'rxjs-marbles/jest';

describe('filterIsSafeInteger', () => {
  it(
    'should filter values that are safe integers',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: -1, b: 0, c: 9007199254740992, d: 9007199254740991, e: 3.14 });
      const subs = '^----------!';
      const expected = m.cold('-a-b---d---|', { a: -1, b: 0, d: 9007199254740991, e: 3.14 });
      m.expect(input.pipe(filterIsSafeInteger())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
