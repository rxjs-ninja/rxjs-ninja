import { substring } from '@rxjs-ninja/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';

describe('substring', () => {
  it(
    'should return a substring string from the start and end value',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'Mary had a little lamb' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: 'Mary' });
      m.expect(input.pipe(substring(0, 4))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a substring string from the start and end value',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'Mary had a little lamb' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: 'had a little lamb' });
      m.expect(input.pipe(substring(5))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
