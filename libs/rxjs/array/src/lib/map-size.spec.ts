import { marbles } from 'rxjs-marbles';
import { mapSize } from './map-size';

describe('mapSize', () => {
  it(
    'should emit the size of the Map',
    marbles((m) => {
      const input = m.hot('-a-|', { a: new Map([['k', 1]]) });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: 1 });
      m.expect(input.pipe(mapSize())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});