import { marbles } from 'rxjs-marbles';
import { mapHas } from './map-has';

describe('mapHas', () => {
  it(
    'should emit whether the Map has the key',
    marbles((m) => {
      const input = m.hot('-a-|', { a: new Map([['k', 1]]) });
      const subs = '^--!';
      const expected = m.cold('-t-|', { t: true });
      m.expect(input.pipe(mapHas('k'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});