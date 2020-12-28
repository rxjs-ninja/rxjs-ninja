import { marbles } from 'rxjs-marbles/jest';
import { acos } from '@rxjs-ninja/rxjs-math';

describe('acos', () => {
  it(
    'should return the arccosign value ',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: -2, b: -1, c: 0, d: 1, e: 2 });
      const subs = '^----------!';
      const expected = m.cold('-a-b-c-d-e-|', {
        a: NaN,
        b: 3.141592653589793,
        c: 1.5707963267948966,
        d: 0,
        e: NaN,
      });
      m.expect(input.pipe(acos())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
