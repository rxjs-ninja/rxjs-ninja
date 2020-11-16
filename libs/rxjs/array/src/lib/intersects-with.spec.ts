import { of } from 'rxjs';
import { intersectsWith } from './intersects-with';
import { marbles } from 'rxjs-marbles';

describe('intersectsWith', () => {
  it(
    'should return an array of the differences between the source and the difference of strings',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['a', 'b', 'c'], b: ['a', 'd', 'e'], c: ['x', 'y', 'z'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: ['a', 'c'], y: ['a'], z: [] });
      m.expect(input.pipe(intersectsWith(['a', 'c']))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
  it(
    'should return an array of the differences between the source and the difference of strings with predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['a', 'b', 'c'], b: ['a', 'd', 'e'], c: ['x', 'y', 'z'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: ['a', 'c'], y: ['a'], z: [] });
      m.expect(input.pipe(intersectsWith(['A', 'C'], (x, y) => x === y.toLowerCase()))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an array of the differences between the source and the difference of numbers',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [1, 2, 3], b: [1, 4, 5], c: [10, 11, 12] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [1, 2], y: [1], z: [] });
      m.expect(input.pipe(intersectsWith([1, 2]))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an array of the differences between the source and the difference of numbers with predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [1.1, 1.9, 3.5], b: [1.1, 2.7, 3.5], c: [10.12, 11.12, 12.12] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [1.1, 1.9], y: [1.1], z: [] });
      m.expect(input.pipe(intersectsWith([1, 2], (x, y) => x <= y))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an array of the differences between the observable source and the difference of strings',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['a', 'b', 'c'], b: ['a', 'd', 'e'], c: ['x', 'y', 'z'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: ['a', 'c'], y: ['a'], z: [] });
      m.expect(input.pipe(intersectsWith(of(['a', 'c'])))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
  it(
    'should return an array of the differences between the observable source and the difference of strings with predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['a', 'b', 'c'], b: ['a', 'd', 'e'], c: ['x', 'y', 'z'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: ['a', 'c'], y: ['a'], z: [] });
      m.expect(input.pipe(intersectsWith(of(['A', 'C']), (x, y) => x === y.toLowerCase()))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
