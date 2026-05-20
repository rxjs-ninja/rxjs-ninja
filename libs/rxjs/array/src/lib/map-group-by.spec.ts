import { marbles } from 'rxjs-marbles';
import { mapGroupBy } from './map-group-by';

describe('mapGroupBy', () => {
  it(
    'should group iterable items into a Map',
    marbles((m) => {
      const input = m.hot('-a-|', { a: ['x', 'xy', 'y'] });
      const subs = '^--!';
      const expected = m.cold('-x-|', {
        x: new Map([
          [1, ['x', 'y']],
          [2, ['xy']],
        ]),
      });
      m.expect(input.pipe(mapGroupBy((s) => s.length))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});