import { difference } from './difference';
import { marbles } from 'rxjs-marbles/jest';
import { of } from 'rxjs';

describe('difference', () => {
  it(
    'should return an array of the differences between the source and the difference of strings',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['a', 'b', 'c'], b: ['a', 'd', 'e'], c: ['x', 'y', 'z'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: ['b'], y: ['d', 'e'], z: ['x', 'y', 'z'] });
      m.expect(input.pipe(difference(['a', 'c']))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an array of the differences between the source and mutated difference of strings',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['a', 'b', 'c'], b: ['a', 'd', 'e'], c: ['x', 'y', 'z'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: ['b'], y: ['d', 'e'], z: ['x', 'y', 'z'] });
      m.expect(input.pipe(difference(['A', 'C'], (val) => val.toUpperCase()))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an array of the differences between the source and the difference of numbers',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [1, 2, 3], b: [1, 4, 5], c: [10, 11, 12] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [3], y: [4, 5], z: [10, 11, 12] });
      m.expect(input.pipe(difference([1, 2]))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an array of the differences between the source and mutated difference of numbers',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [1.1, 2.1, 3.5], b: [1.1, 2.7, 3.5], c: [10.12, 11.12, 12.12] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [3.5], y: [2.7, 3.5], z: [10.12, 11.12, 12.12] });
      m.expect(input.pipe(difference([1, 2], Math.round))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an array of the differences between the observable source and the difference of strings',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['a', 'b', 'c'], b: ['a', 'd', 'e'], c: ['x', 'y', 'z'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: ['b'], y: ['d', 'e'], z: ['x', 'y', 'z'] });
      m.expect(input.pipe(difference(of(['a', 'c'])))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an array of the differences between the observable source and mutated difference of strings',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['a', 'b', 'c'], b: ['a', 'd', 'e'], c: ['x', 'y', 'z'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: ['b'], y: ['d', 'e'], z: ['x', 'y', 'z'] });
      m.expect(input.pipe(difference(of(['A', 'C']), (val) => val.toUpperCase()))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
