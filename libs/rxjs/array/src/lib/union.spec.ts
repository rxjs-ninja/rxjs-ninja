import { marbles } from 'rxjs-marbles';
import { union } from './union';

describe('union', () => {
  it(
    'should return the union of source and input arrays',
    marbles((m) => {
      const input = m.hot('-a-|', { a: ['a', 'b', 'c'] });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: ['a', 'b', 'c', 'd'] });
      m.expect(input.pipe(union(['b', 'c', 'd']))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
