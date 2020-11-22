import { replace } from '@rxjs-ninja/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';

describe('replace', () => {
  it(
    'should replace a string with the passed string pattern',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'Mary had a little lamb' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: 'Mary had a little dog' });
      m.expect(input.pipe(replace('lamb', 'dog'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should replace a regex pattern with the passed string pattern',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'Mary had a little LAMB' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: 'Mary had a little dog' });
      m.expect(input.pipe(replace(/lamb/gi, 'dog'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
