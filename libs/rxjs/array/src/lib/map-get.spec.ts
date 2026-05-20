import { marbles } from 'rxjs-marbles';
import { mapGet } from './map-get';

describe('mapGet', () => {
  it(
    'should get a value from a Map by key',
    marbles((m) => {
      const input = m.hot('-a-|', { a: new Map([['k', 1]]) });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: 1 });
      m.expect(input.pipe(mapGet('k'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});