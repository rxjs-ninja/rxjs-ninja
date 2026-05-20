import { marbles } from 'rxjs-marbles';
import { withIndex } from './with-index';

describe('withIndex', () => {
  it(
    'should return a copy with the value at the given index replaced',
    marbles((m) => {
      const input = m.hot('-a-|', { a: [1, 2, 3, 4] });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: [1, 9, 3, 4] });
      m.expect(input.pipe(withIndex(1, 9))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});