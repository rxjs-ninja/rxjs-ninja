import { isFinite } from '@rxjs-ninja/rxjs-number';
import { marbles } from 'rxjs-marbles/jest';

describe('isFinite', () => {
  it(
    'should filter values that are finite only',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: -Infinity, b: 0, c: 1, d: 2, e: Infinity });
      const subs = '^----------!';
      const expected = m.cold('-a-b-c-d-e-|', { a: false, b: true, c: true, d: true, e: false });
      m.expect(input.pipe(isFinite())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
