import { marbles } from 'rxjs-marbles/jest';
import { median } from './median';

describe('median', () => {
  it(
    'should return the median value of numbers in the array',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [1, 2, 3], b: [10, 15, 8], c: [5, 10, 75, 100] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 2, y: 15, z: 52.5 });
      m.expect(input.pipe(median())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
