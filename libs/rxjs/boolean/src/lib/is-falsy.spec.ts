import { marbles } from 'rxjs-marbles/jest';
import { isFalsy } from './is-falsy';

describe('isFalsy', () => {
  it(
    'should emit whether each value is falsy',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: true, b: 0, c: false });
      const subs = '^------!';
      const expected = m.cold('-f-t-t-|', { f: false, t: true });
      m.expect(input.pipe(isFalsy())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});