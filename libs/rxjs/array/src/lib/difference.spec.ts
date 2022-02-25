import { of } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';
import { difference } from './difference';

describe('difference', () => {
  it(
    'should return an array of the differences between the source and the difference of strings',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: ['a', 'b', 'c', 'b'],
        b: ['a', 'd', 'e'],
        c: ['x', 'y', 'z'],
      });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: ['b'], y: ['d', 'e'], z: ['x', 'y', 'z'] });
      m.expect(input.pipe(difference(['a', 'c', 'g']))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an array of the differences between the source and the difference of numbers',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [1, 2, 3, 3], b: [1, 4, 5], c: [10, 11, 12] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [3], y: [4, 5], z: [10, 11, 12] });
      m.expect(input.pipe(difference([1, 2, 42]))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an array of the differences between the source and the observable difference of strings',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: ['a', 'b', 'c', 'b'],
        b: ['a', 'd', 'e'],
        c: ['x', 'y', 'z'],
      });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: ['b'], y: ['d', 'e'], z: ['x', 'y', 'z'] });
      m.expect(input.pipe(difference(of(['a', 'c', 'g'])))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
