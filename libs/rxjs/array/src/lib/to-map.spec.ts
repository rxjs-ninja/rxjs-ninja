import { marbles } from 'rxjs-marbles';
import { toMap } from '@rxjs-ninja/rxjs-array';

describe('toMap', () => {
  it(
    'should return a Set from an array',
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
        x: new Map<number, string>([
          [1, 'a'],
          [2, 'b'],
          [3, 'c'],
        ]),
        y: new Map<number, string>([
          [4, 'd'],
          [5, 'e'],
          [6, 'f'],
        ]),
        z: new Map<number, string>([
          [7, 'g'],
          [8, 'h'],
          [9, 'i'],
        ]),
      });
      m.expect(input.pipe(toMap())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
