import { marbles } from 'rxjs-marbles';
import { toSet } from '@rxjs-ninja/rxjs-array';

describe('toSet', () => {
  it(
    'should return a Set from an array',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['x', 'a', 'f'], b: ['a', 'a', 'b'], c: ['c', 'y', 'o'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', {
        x: new Set(['x', 'a', 'f']),
        y: new Set(['a', 'a', 'b']),
        z: new Set(['c', 'y', 'o']),
      });
      m.expect(input.pipe(toSet())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
