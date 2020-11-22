import { marbles } from 'rxjs-marbles/jest';
import { flipArray } from '@rxjs-ninja/rxjs-array';

describe('flipArray', () => {
  it(
    'should return a flipped array of boolean values',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [false, true, false], b: [true, false], c: [false] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [true, false, true], y: [false, true], z: [true] });
      m.expect(input.pipe(flipArray())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
