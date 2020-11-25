import { marbles } from 'rxjs-marbles';
import { find } from '@rxjs-ninja/rxjs-array';
import { findAll } from './find-all';

describe('findAll', () => {
  it(
    'should return an array of all truthy values that have a Boolean truthy',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [0, 0, 0], b: [1, 1, 1], c: [0, 1, 1, 0] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [], y: [1, 1, 1], z: [1, 1] });
      m.expect(input.pipe(findAll())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an array of all truthy values for a predicate function',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [0, 0, 0], b: [1, 10, 1], c: [0, 10, 11, 0] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [], y: [10], z: [10, 11] });
      m.expect(input.pipe(findAll((v) => v > 5))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
