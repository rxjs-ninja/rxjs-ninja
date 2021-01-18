import { marbles } from 'rxjs-marbles/jest';
import { lastIndexOf } from '@rxjs-ninja/rxjs-array';
import { of } from 'rxjs';

describe('lastIndexOf', () => {
  it(
    'should return the last index of the item in the array or -1',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['a', 'b', 'a'], b: ['a', 'b', 'd'], c: ['z', 'y', 'x', 'b'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 2, y: 0, z: -1 });
      m.expect(input.pipe(lastIndexOf('a'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an array of the last index of the items in the array or -1',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['a', 'b', 'b', 'c'], b: ['a', 'c', 'd', 'd'], c: ['z', 'y', 'x', 'b'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [0, 2], y: [0, -1], z: [-1, 3] });
      m.expect(input.pipe(lastIndexOf(['a', 'b']))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the last index of the item in the array or -1 from a different start index',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [0, 1, 0, 0, 1, 0, 1], b: [0, 0, 0, 1, 0, 0, 1], c: [0, 0, 0, 0, 1, 1, 1] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 1, y: 3, z: -1 });
      m.expect(input.pipe(lastIndexOf(1, 3))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the last index of the Observable item in the array or -1 from a different Observable start index',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [0, 1, 0, 0, 1, 0, 1], b: [0, 0, 1, 0, 0, 0, 1], c: [0, 0, 0, 0, 1, 1, 1] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 1, y: 2, z: -1 });
      m.expect(input.pipe(lastIndexOf(of(1), of(3)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an array of the last index of the item in the array or -1 from a different start index',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [0, 1, 2, 0, 1, 2, 0], b: [2, 1, 0, 0, 0, 1, 0], c: [0, 0, 0, 0, 0, 0, 2] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [4, 5], y: [5, 0], z: [-1, -1] });
      m.expect(input.pipe(lastIndexOf([1, 2], 5))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
