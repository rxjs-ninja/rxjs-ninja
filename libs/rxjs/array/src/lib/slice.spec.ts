import { marbles } from 'rxjs-marbles';
import { slice } from './slice';

describe('slice', () => {
  it(
    'should return a slice between start and end',
    marbles((m) => {
      const input = m.hot('-a-|', { a: ['a', 'b', 'c', 'd'] });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: ['b', 'c'] });
      m.expect(input.pipe(slice(1, 3))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a shallow copy when called without arguments',
    marbles((m) => {
      const input = m.hot('-a-|', { a: [1, 2, 3] });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: [1, 2, 3] });
      m.expect(input.pipe(slice())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
