import { isInteger } from '@rxjs-ninja/rxjs-number';
import { marbles } from 'rxjs-marbles/jest';

describe('isInteger', () => {
  it(
    'should filter values that are integer only',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-f-|', { a: -Infinity, b: -1, c: 0, d: 1, e: NaN, f: 3.14 });
      const subs = '^------------!';
      const expected = m.cold('-a-b-c-d-e-f-|', { a: false, b: true, c: true, d: true, e: false, f: false });
      m.expect(input.pipe(isInteger())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
