import { isNaN } from '@rxjs-ninja/rxjs-number';
import { marbles } from 'rxjs-marbles/jest';

describe('isNaN', () => {
  it(
    'should filter values that are NaN only',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-f-|', { a: -Infinity, b: -1, c: 0, d: 1, e: NaN, f: 3.14 });
      const subs = '^------------!';
      const expected = m.cold('-a-b-c-d-e-f-|', {
        a: false,
        b: false,
        c: false,
        d: false,
        e: true,
        f: false,
      });
      m.expect(input.pipe(isNaN())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
