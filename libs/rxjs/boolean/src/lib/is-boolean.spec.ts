import { marbles } from 'rxjs-marbles/jest';
import { isBoolean } from './is-boolean';

describe('isBoolean', () => {
  it(
    'should emit true when the value is a boolean',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: true, b: 0, c: false });
      const subs = '^------!';
      const expected = m.cold('-t-f-t-|', { t: true, f: false });
      m.expect(input.pipe(isBoolean())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});