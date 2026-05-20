import { marbles } from 'rxjs-marbles';
import { mapDelete } from './map-delete';

describe('mapDelete', () => {
  it(
    'should return a new Map without the key',
    marbles((m) => {
      const input = m.hot('-a-|', { a: new Map([['k', 1]]) });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: new Map() });
      m.expect(input.pipe(mapDelete('k'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});