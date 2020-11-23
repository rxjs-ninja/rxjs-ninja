import { marbles } from 'rxjs-marbles';
import { findIndex } from '@rxjs-ninja/rxjs-array';

describe('findIndex', () => {
  it(
    'should return the index of the first item from the array that is found via the predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [1, 2, 3, 4, 5, 6], b: [1, 5, 4, 2], c: [0, 5, 11, 13, 87] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 5, y: -1, z: 2 });
      m.expect(input.pipe(findIndex((v) => v > 5))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
