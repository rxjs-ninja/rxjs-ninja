import { marbles } from 'rxjs-marbles';
import { flat } from './flat';

describe('flat', () => {
  it(
    'should flatten the source array to the given depth',
    marbles((m) => {
      const input = m.hot('-a-|', { a: [1, [2, 3]] });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: [1, 2, 3] });
      m.expect(input.pipe(flat())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
