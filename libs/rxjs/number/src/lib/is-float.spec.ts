import { marbles } from 'rxjs-marbles/jest';
import { isFloat } from '@rxjs-ninja/rxjs-number';

describe('isFloat', () => {
  it(
    'should filter values that are float only',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-f-|', { a: -Infinity, b: -1.1, c: 0, d: 1, e: NaN, f: 3.14 });
      const subs = '^------------!';
      const expected = m.cold('-a-b-c-d-e-f-|', { a: false, b: true, c: false, d: false, e: false, f: true });
      m.expect(input.pipe(isFloat())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
