import { marbles } from 'rxjs-marbles';
import { isSupersetOf } from './is-superset-of';

describe('isSuperset', () => {
  it(
    'should return an boolean value if the source is a super set of passed array',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['a', 'b', 'c'], b: ['a', 'd', 'e'], c: ['x', 'y', 'z'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: true, y: false, z: false });
      m.expect(input.pipe(isSupersetOf(['a', 'c']))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
