import { marbles } from 'rxjs-marbles/jest';
import { acos, cos } from '@rxjs-ninja/rxjs-math';

describe('cos', () => {
  it(
    'should return the arccosign value ',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: -2, b: -1, c: 0, d: 1, e: 2 });
      const subs = '^----------!';
      const expected = m.cold('-a-b-c-d-e-|', {
        a: -0.4161468365471424,
        b: 0.5403023058681398,
        c: 1,
        d: 0.5403023058681398,
        e: -0.4161468365471424,
      });
      m.expect(input.pipe(cos())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
