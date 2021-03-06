import { of } from 'rxjs';
import { intersects } from '@rxjs-ninja/rxjs-array';
import { marbles } from 'rxjs-marbles/jest';

describe('intersects', () => {
  it(
    'should return an array of the intersection between the source and the difference of strings',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['a', 'b', 'c', 'a'], b: ['a', 'd', 'e'], c: ['x', 'y', 'z'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: ['a', 'c'], y: ['a'], z: [] });
      m.expect(input.pipe(intersects(['a', 'c']))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an array of the differences between the source and the difference of numbers',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [1, 2, 3, 2], b: [1, 4, 5], c: [10, 11, 12] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [1, 2], y: [1], z: [] });
      m.expect(input.pipe(intersects([1, 2]))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an array of the differences between the observable source and the difference of strings',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['a', 'b', 'c', 'a'], b: ['a', 'd', 'e'], c: ['x', 'y', 'z'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: ['a', 'c'], y: ['a'], z: [] });
      m.expect(input.pipe(intersects(of(['a', 'c'])))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
