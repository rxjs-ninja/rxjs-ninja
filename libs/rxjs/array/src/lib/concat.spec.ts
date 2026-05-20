import { marbles } from 'rxjs-marbles';
import { concat } from './concat';

describe('concat', () => {
  it(
    'should concatenate source and input arrays',
    marbles((m) => {
      const input = m.hot('-a-|', { a: ['a', 'b'] });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: ['a', 'b', 'c', 'd'] });
      m.expect(input.pipe(concat(['c', 'd']))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
