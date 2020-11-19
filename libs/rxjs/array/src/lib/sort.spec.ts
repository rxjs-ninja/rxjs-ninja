import { of } from 'rxjs';
import { intersectsWith } from './intersects-with';
import { marbles } from 'rxjs-marbles';
import { sort } from './sort';

describe('sort', () => {
  it(
    'should return an sorted array of strings',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['x', 'a', 'f'], b: ['v', 'n', 'e'], c: ['c', 'y', 'o'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: ['a', 'f', 'x'], y: ['e', 'n', 'v'], z: ['c', 'o', 'y'] });
      m.expect(input.pipe(sort())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an sorted array of numbers',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [3, 1, 5], b: [0, 10, 2], c: [9, 8, 4] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [1, 3, 5], y: [0, 2, 10], z: [4, 8, 9] });
      m.expect(input.pipe(sort())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
