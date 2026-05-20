import { marbles } from 'rxjs-marbles';
import { mapSet } from './map-set';

describe('mapSet', () => {
  it(
    'should return a new Map with the key set',
    marbles((m) => {
      const input = m.hot('-a-|', { a: new Map([['k', 1]]) });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: new Map([['k', 1], ['z', 2]]) });
      m.expect(input.pipe(mapSet('z', 2))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});