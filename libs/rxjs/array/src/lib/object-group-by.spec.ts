import { marbles } from 'rxjs-marbles';
import { objectGroupBy } from './object-group-by';

describe('objectGroupBy', () => {
  it(
    'should group iterable items by key',
    marbles((m) => {
      const input = m.hot('-a-|', { a: ['x', 'xy', 'y'] });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: { 1: ['x', 'y'], 2: ['xy'] } });
      m.expect(input.pipe(objectGroupBy((s) => s.length))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});