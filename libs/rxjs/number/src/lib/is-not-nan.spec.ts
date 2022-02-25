import { marbles } from 'rxjs-marbles/jest';
import { isNotNaN } from './is-not-nan';

describe('isNotNaN', () => {
  it(
    'should filter values that are not NaN only',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-f-|', { a: -Infinity, b: -1, c: 0, d: 1, e: NaN, f: 3.14 });
      const subs = '^------------!';
      const expected = m.cold('-a-b-c-d-e-f-|', {
        a: true,
        b: true,
        c: true,
        d: true,
        e: false,
        f: true,
      });
      m.expect(input.pipe(isNotNaN())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
