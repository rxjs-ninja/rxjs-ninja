import { marbles } from 'rxjs-marbles/jest';
import { isTruthy } from './is-truthy';

describe('isTruthy', () => {
  it(
    'should emit whether each value is truthy',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: true, b: 0, c: false });
      const subs = '^------!';
      const expected = m.cold('-t-f-f-|', { t: true, f: false });
      m.expect(input.pipe(isTruthy())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});