import { marbles } from 'rxjs-marbles';
import { mapToArray } from './map-to-array';

describe('mapToArray', () => {
  it(
    'should return an sorted array of strings converted to uppercase',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: new Map<number, string>([
          [1, 'a'],
          [2, 'b'],
          [3, 'c'],
        ]),
        b: new Map<number, string>([[1, 'a']]),
        c: new Map<number, string>([
          [1, 'a'],
          [3, 'c'],
        ]),
      });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', {
        x: [
          [1, 'a'],
          [2, 'b'],
          [3, 'c'],
        ] as [number, string][],
        y: [[1, 'a']] as [number, string][],
        z: [
          [1, 'a'],
          [3, 'c'],
        ] as [number, string][],
      });
      m.expect(input.pipe(mapToArray())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
