import { marbles } from 'rxjs-marbles';
import { at } from './at';

describe('at', () => {
  it(
    'should return the value at a positive index',
    marbles((m) => {
      const input = m.hot('-a-|', { a: ['a', 'b', 'c'] });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: 'b' });
      m.expect(input.pipe(at(1))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the value at a negative index',
    marbles((m) => {
      const input = m.hot('-a-|', { a: [10, 20, 30] });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: 30 });
      m.expect(input.pipe(at(-1))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
