import { marbles } from 'rxjs-marbles/jest';
import { acos, cos, cosh } from '@rxjs-ninja/rxjs-math';

describe('cosh', () => {
  it(
    'should return the arccosign value ',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: -2, b: -1, c: 0, d: 1, e: 2 });
      const subs = '^----------!';
      const expected = m.cold('-a-b-c-d-e-|', {
        a: 3.7621956910836314,
        b: 1.5430806348152437,
        c: 1,
        d: 1.5430806348152437,
        e: 3.7621956910836314,
      });
      m.expect(input.pipe(cosh())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
