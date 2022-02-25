import { of } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';
import { indexOf } from './index-of';

describe('indexOf', () => {
  it(
    'should return the first index of the value in the array',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['a', 'b', 'c'], b: ['a', 'c', 'd'], c: ['z', 'y', 'x', 'b'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [1], y: [-1], z: [3] });
      m.expect(input.pipe(indexOf('b'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the first index of the Observable value in the array',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['a', 'b', 'c'], b: ['a', 'c', 'd'], c: ['z', 'y', 'x', 'b'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [1], y: [-1], z: [3] });
      m.expect(input.pipe(indexOf(of('b')))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the first index of the value in the array of array values',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['a', 'b', 'c'], b: ['a', 'c', 'd'], c: ['z', 'y', 'x', 'b'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [1, 2], y: [-1, 1], z: [3, -1] });
      m.expect(input.pipe(indexOf(['b', 'c']))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the first index of the value in the Observable array of array values',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['a', 'b', 'c'], b: ['a', 'c', 'd'], c: ['z', 'y', 'x', 'b'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [1, 2], y: [-1, 1], z: [3, -1] });
      m.expect(input.pipe(indexOf(of(['b', 'c'])))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the first index of the value in the array from start index',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [0, 1, 0, 0, 1, 0, 1], b: [0, 1, 0, 0, 0, 1, 0], c: [0, 1, 0, 0, 0, 0, 0] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [4], y: [5], z: [-1] });
      m.expect(input.pipe(indexOf(1, 3))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the first index of the value in the Observable array from Observable start index',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [0, 1, 0, 0, 1, 0, 1], b: [0, 1, 0, 0, 0, 0, 1], c: [0, 1, 0, 0, 0, 0, 0] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [4], y: [6], z: [-1] });
      m.expect(input.pipe(indexOf(of(1), of(3)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the first index of the value in the array of array values from start index',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [0, 1, 2, 0, 1, 2, 0], b: [0, 1, 1, 1, 0, 1, 2], c: [0, 1, 0, 0, 0, 0, 0] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [4, 2], y: [2, 6], z: [-1, -1] });
      m.expect(input.pipe(indexOf([1, 2], 2))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the first index of the value in the array of Observable array values from Observable start index',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [0, 1, 2, 0, 1, 2, 0], b: [0, 1, 1, 1, 2, 1, 0], c: [0, 1, 0, 0, 0, 0, 0] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [4, 2], y: [2, 4], z: [-1, -1] });
      m.expect(input.pipe(indexOf(of([1, 2]), of(2)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
