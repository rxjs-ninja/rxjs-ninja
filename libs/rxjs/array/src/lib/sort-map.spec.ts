import { marbles } from 'rxjs-marbles';
import { sortMap } from '@rxjs-ninja/rxjs-array';

describe('sortMap', () => {
  it(
    'should return an sorted array of strings converted to uppercase',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['x', 'a', 'f'], b: ['v', 'n', 'e'], c: ['c', 'y', 'o'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: ['A', 'F', 'X'], y: ['E', 'N', 'V'], z: ['C', 'O', 'Y'] });
      m.expect(input.pipe(sortMap((v) => v.toUpperCase()))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an sorted array of numbers multiplied by 10',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [3, 1, 5], b: [0, 10, 2], c: [9, 8, 4] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [10, 30, 50], y: [0, 20, 100], z: [40, 80, 90] });
      m.expect(input.pipe(sortMap((v) => v * 10))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an sorted array of numbers from parsed strings',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [9, 1, 5], b: [0, 10, 2], c: [9, 8, 4] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [false, true, true], y: [false, false, true], z: [false, true, true] });
      m.expect(input.pipe(sortMap((v) => v >= 5))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
