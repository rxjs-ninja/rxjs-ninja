import { marbles } from 'rxjs-marbles';
import { fromObjectKeys } from '@rxjs-ninja/rxjs-array';

describe('fromObjectKeys', () => {
  it(
    'should return an array of object keys',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: { 1: 'a', 2: 'b', 3: 'c' } as Record<number, string>,
        b: { 1: 'a' } as Record<number, string>,
        c: { 1: 'a', 3: 'c' } as Record<number, string>,
      });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', {
        x: ['1', '2', '3'],
        y: ['1'],
        z: ['1', '3'],
      });
      m.expect(input.pipe(fromObjectKeys())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
