import { marbles } from 'rxjs-marbles';
import { isEqualSet } from '@rxjs-ninja/rxjs-array';

describe('isEqualSet', () => {
  it(
    'should return an boolean value if the source is an equal set of passed array',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['a', 'b', 'c'], b: ['a', 'c', 'b', 'a'], c: ['a', 'b', 'z', 'x'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: true, y: true, z: false });
      m.expect(input.pipe(isEqualSet(['a', 'b', 'c']))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an boolean value if the source is an equal set of passed array',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: new Set(['a', 'b', 'c']),
        b: new Set(['a', 'c', 'b', 'a']),
        c: new Set(['a', 'b', 'z', 'x']),
      });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: true, y: true, z: false });
      m.expect(input.pipe(isEqualSet(['a', 'b', 'c']))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
