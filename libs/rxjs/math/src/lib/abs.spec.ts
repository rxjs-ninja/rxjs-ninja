import { marbles } from 'rxjs-marbles/jest';
import { abs } from '@rxjs-ninja/rxjs-math';

describe('abs', () => {
  it(
    'should return the absolute value ',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: -1, b: -2, c: 1, d: 2, e: 5.4444444444444444 });
      const subs = '^----------!';
      const expected = m.cold('-a-b-c-d-e-|', { a: 1, b: 2, c: 1, d: 2, e: 5.444444444444445 });
      m.expect(input.pipe(abs())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
