import { filterIsFinite } from '@rxjs-ninja/rxjs-number';
import { marbles } from 'rxjs-marbles/jest';

describe('filterIsFinite', () => {
  it(
    'should filter values that are finite only',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-f-|', {
        a: -Infinity,
        b: 0,
        c: 1,
        d: 2,
        e: Infinity,
        f: Number.MAX_VALUE * 2,
      });
      const subs = '^------------!';
      const expected = m.cold('---b-c-d-----|', { b: 0, c: 1, d: 2 });
      m.expect(input.pipe(filterIsFinite())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
