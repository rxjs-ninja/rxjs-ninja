import { marbles } from 'rxjs-marbles/jest';
import { filterIsFloat } from './filter-is-float';

describe('filterIsFloat', () => {
  it(
    'should filter values that are float only',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-f-g-h-|', {
        a: -1,
        b: 0,
        c: 1,
        d: 2.3,
        e: 3.14,
        f: NaN,
        g: Infinity,
        h: -2.3,
      });
      const subs = '^----------------!';
      const expected = m.cold('-------d-e-----h-|', { d: 2.3, e: 3.14, h: -2.3 });
      m.expect(input.pipe(filterIsFloat())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
