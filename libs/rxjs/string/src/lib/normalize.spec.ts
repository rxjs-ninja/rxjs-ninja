import { of } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';
import { FormType } from '../types/normalize';
import { normalize } from './normalize';

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

  it(
    'should normalise a unicode character string with form',
    marbles((m) => {
      const input = m.hot('-a-|', { a: '\u0041\u006d\u00e9\u006c\u0069\u0065' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: 'Amélie' });
      m.expect(input.pipe(normalize(FormType.NFD))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should normalise a unicode character string with Observable form',
    marbles((m) => {
      const input = m.hot('-a-|', { a: '\u0041\u006d\u00e9\u006c\u0069\u0065' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: 'Amélie' });
      m.expect(input.pipe(normalize(of(FormType.NFD)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
