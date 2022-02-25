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

  it(
    'should return an sorted array with duplicate numbers',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [3, 1, 3], b: [2, 0, 2], c: [9, 8, 9] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [1, 3, 3], y: [0, 2, 2], z: [8, 9, 9] });
      m.expect(input.pipe(sort())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an sorted array of numbers tuples',
    marbles((m) => {
      const input = m.hot('-a-|', {
        a: [
          [10, 3],
          [20, 2],
          [30, 1],
        ],
      });
      const subs = '^--!';
      const expected = m.cold('-z-|', {
        z: [
          [30, 1],
          [20, 2],
          [10, 3],
        ],
      });
      m.expect(
        input.pipe(
          sort((a, b) => {
            if (a[1] === b[1]) return 0;
            return a[1] < b[1] ? -1 : 1;
          }),
        ),
      ).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an sorted array of objects',
    marbles((m) => {
      const input = m.hot('-a-|', {
        a: [
          { value: 10, key: 3 },
          { value: 20, key: 2 },
          { value: 30, key: 1 },
        ],
      });
      const subs = '^--!';
      const expected = m.cold('-z-|', {
        z: [
          { value: 30, key: 1 },
          { value: 20, key: 2 },
          { value: 10, key: 3 },
        ],
      });
      m.expect(
        input.pipe(
          sort((a, b) => {
            if (a.key === b.key) return 0;
            return a.key < b.key ? -1 : 1;
          }),
        ),
      ).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
