import { marbles } from 'rxjs-marbles';
import { findLast } from './find-last';

describe('findLast', () => {
  it(
    'should return the first item from the array that is Boolean truthy',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [0, 2, 0, 0, 1, 0], b: [0, 0, 0, 0], c: [99, 0, 42] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 1, y: undefined, z: 42 });
      m.expect(input.pipe(findLast())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the first item from the array that is found via the predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [18, 2, 30, 4, 5, 6], b: [1, 5, 4, 2], c: [0, 5, 11, 13, 87] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 6, y: undefined, z: 87 });
      m.expect(input.pipe(findLast((v) => v > 5))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
