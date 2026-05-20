import { marbles } from 'rxjs-marbles';
import { symmetricDifference } from './symmetric-difference';

describe('symmetricDifference', () => {
  it(
    'should return values in either array but not both',
    marbles((m) => {
      const input = m.hot('-a-|', { a: ['a', 'b', 'c'] });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: ['a', 'd'] });
      m.expect(input.pipe(symmetricDifference(['b', 'c', 'd']))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
