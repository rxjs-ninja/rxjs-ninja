import { titleize } from '@rxjs-ninja/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';

describe('titleize', () => {
  it(
    'should return a titlized string',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'Mary had a little lamb' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: 'Mary Had A Little Lamb' });
      m.expect(input.pipe(titleize())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a locale titlized string with locale',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'Mary had ä little lamb' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: 'Mary Had Ä Little Lamb' });
      m.expect(input.pipe(titleize('de-DE'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a locale titlized string with locale and separator',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'Mary-had-ä-little-lamb' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: 'Mary-Had-Ä-Little-Lamb' });
      m.expect(input.pipe(titleize('de-DE', '-'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
