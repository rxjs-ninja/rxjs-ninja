import { normalize } from '@rxjs-ninja/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';

describe('normalize', () => {
  it(
    'should normalise a unicode character string',
    marbles((m) => {
      const input = m.hot('-a-|', { a: '\u0041\u006d\u00e9\u006c\u0069\u0065' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: 'Amélie' });
      m.expect(input.pipe(normalize())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
