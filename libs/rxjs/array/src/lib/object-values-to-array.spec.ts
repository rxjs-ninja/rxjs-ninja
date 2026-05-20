import { marbles } from 'rxjs-marbles';
import { objectValuesToArray } from './object-values-to-array';

describe('objectValuesToArray', () => {
  it(
    'should return an array of object values',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: { 1: 'a', 2: 'b', 3: 'c' } as Record<number, string>,
        b: { 1: 'a' } as Record<number, string>,
        c: { 1: 'a', 3: 'c' } as Record<number, string>,
      });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', {
        x: ['a', 'b', 'c'],
        y: ['a'],
        z: ['a', 'c'],
      });
      m.expect(input.pipe(objectValuesToArray())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
