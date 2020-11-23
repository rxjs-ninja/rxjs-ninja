import { marbles } from 'rxjs-marbles';
import { find } from '@rxjs-ninja/rxjs-array';

describe('find', () => {
  it(
    'should return the first item from the array that is found via the predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [1, 2, 3, 4, 5, 6], b: [1, 5, 4, 2], c: [0, 5, 11, 13, 87] });
      const subs = '^------!';
      const expected = m.cold('-x---z-|', { x: 6, z: 11 });
      m.expect(input.pipe(find((v) => v > 5))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
