import { marbles } from 'rxjs-marbles';
import { isDisjointFrom } from './is-disjoint-from';

describe('isDisjointFrom', () => {
  it(
    'should return true when source and input share no values',
    marbles((m) => {
      const input = m.hot('-a-|', { a: ['a', 'b'] });
      const subs = '^--!';
      const expected = m.cold('-t-|', { t: true });
      m.expect(input.pipe(isDisjointFrom(['c', 'd']))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return false when source and input overlap',
    marbles((m) => {
      const input = m.hot('-a-|', { a: ['a', 'c'] });
      const subs = '^--!';
      const expected = m.cold('-f-|', { f: false });
      m.expect(input.pipe(isDisjointFrom(['a', 'd']))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
