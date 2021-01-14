import { marbles } from 'rxjs-marbles';
import { fromObjectEntries } from '@rxjs-ninja/rxjs-array';

describe('fromObjectEntries', () => {
  it(
    'should return an array of object entries',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', {
        a: { 1: 'a', 2: 'b', 3: 'c' } as Record<number, string>,
        b: { 1: 'a' } as Record<number, string>,
        c: { 1: 'a', 3: 'c' } as Record<number, string>,
      });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', {
        x: [
          ['1', 'a'],
          ['2', 'b'],
          ['3', 'c'],
        ] as [string, string][],
        y: [['1', 'a']] as [string, string][],
        z: [
          ['1', 'a'],
          ['3', 'c'],
        ] as [string, string][],
      });
      m.expect(input.pipe(fromObjectEntries())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
