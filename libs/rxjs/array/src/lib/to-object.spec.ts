import { marbles } from 'rxjs-marbles';
import { toObject } from './to-object';

describe('toObject', () => {
  it(
    'should return a Object from an array',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: [
          [1, 'a'],
          [2, 'b'],
          [3, 'c'],
        ] as [number, string][],
        b: [
          [4, 'd'],
          [5, 'e'],
          [6, 'f'],
        ] as [number, string][],
        c: [
          [7, 'g'],
          [8, 'h'],
          [9, 'i'],
        ] as [number, string][],
      });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', {
        x: { 1: 'a', 2: 'b', 3: 'c' } as Record<number, string>,
        y: { 4: 'd', 5: 'e', 6: 'f' } as Record<number, string>,
        z: { 7: 'g', 8: 'h', 9: 'i' } as Record<number, string>,
      });
      m.expect(input.pipe(toObject())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
