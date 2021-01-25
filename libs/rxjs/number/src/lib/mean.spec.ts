import { marbles } from 'rxjs-marbles/jest';
import { mean } from '@rxjs-ninja/rxjs-number';

describe('mean', () => {
  it(
    'should return the mean of numbers in the array',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [1, 2, 3], b: [10, 15, 8], c: [5, 10, 100] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 2, y: 11, z: 38.333 });
      m.expect(input.pipe(mean())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
