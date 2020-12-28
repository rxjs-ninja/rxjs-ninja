import { marbles } from 'rxjs-marbles/jest';
import { acosh } from '@rxjs-ninja/rxjs-math';

describe('acosh', () => {
  it(
    'should return the hyperbolic arc-cosign value ',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: -1, b: 0, c: 1, d: 2, e: 3 });
      const subs = '^----------!';
      const expected = m.cold('-a-b-c-d-e-|', {
        a: NaN,
        b: NaN,
        c: 0,
        d: 1.3169578969248166,
        e: 1.7627471740390859,
      });
      m.expect(input.pipe(acosh())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
