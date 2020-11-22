import { slice } from '@rxjs-ninja/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';

describe('slice', () => {
  it(
    'should return a sliced string from the start index',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'Mary had a little lamb' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: 'had a little lamb' });
      m.expect(input.pipe(slice(5))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a sliced string from the start index to the length value',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'Mary had a little lamb' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: 'little' });
      m.expect(input.pipe(slice(11, 17))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
