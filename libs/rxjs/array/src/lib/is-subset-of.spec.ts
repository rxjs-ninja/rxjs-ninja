import { marbles } from 'rxjs-marbles';
import { isSubsetOf } from './is-subset-of';

describe('isSubset', () => {
  it(
    'should return an boolean value if the source is a super set of passed array',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['a', 'c'], b: ['a', 'e'], c: ['x', 'z'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: true, y: false, z: false });
      m.expect(input.pipe(isSubsetOf(['a', 'b', 'c']))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an boolean value if the source is a super set of passed array',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: new Set(['a', 'c']), b: new Set(['a', 'e']), c: new Set(['x', 'z']) });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: true, y: false, z: false });
      m.expect(input.pipe(isSubsetOf(['a', 'b', 'c']))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
