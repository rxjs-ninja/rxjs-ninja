import { marbles } from 'rxjs-marbles';
import { mapArray } from './map-array';

describe('mapArray', () => {
  it(
    'should map each element using Array.prototype.map',
    marbles((m) => {
      const input = m.hot('-a-|', { a: [1, 2, 3] });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: [2, 4, 6] });
      m.expect(input.pipe(mapArray((n) => n * 2))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});