import { marbles } from 'rxjs-marbles';
import { includes } from './includes';

describe('includes', () => {
  it(
    'should return true when the search value is in the source',
    marbles((m) => {
      const input = m.hot('-a-|', { a: ['a', 'b', 'c'] });
      const subs = '^--!';
      const expected = m.cold('-t-|', { t: true });
      m.expect(input.pipe(includes('b'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return false when the search value is not in the source',
    marbles((m) => {
      const input = m.hot('-a-|', { a: [1, 2, 3] });
      const subs = '^--!';
      const expected = m.cold('-f-|', { f: false });
      m.expect(input.pipe(includes(4))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
