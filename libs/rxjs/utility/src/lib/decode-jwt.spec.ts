import { marbles } from 'rxjs-marbles/jest';
import { decodeJWT } from '@rxjs-ninja/rxjs-utility';

describe('decodeJWT', () => {
  it(
    'should return a valid JSON Web Token object',
    marbles((m) => {
      const input = m.hot('-a|', {
        a:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      });
      const subs = '^-!';
      const expected = m.cold('-a|', {
        a: {
          sub: '1234567890',
          name: 'John Doe',
          iat: 1516239022,
        },
      });
      m.expect(input.pipe(decodeJWT())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a valid JSON Web Token object with Unicode',
    marbles((m) => {
      const input = m.hot('-a|', {
        a:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lw4bwn5iAIiwiaWF0IjoxNTE2MjM5MDIyfQ.6vr8IizGBr6dTAwSSqYHftvaxQJQWQBIQqrsFRBA608',
      });
      const subs = '^-!';
      const expected = m.cold('-a|', {
        a: {
          sub: '1234567890',
          name: 'John DoeÆ😀',
          iat: 1516239022,
        },
      });
      m.expect(input.pipe(decodeJWT())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an error for an invalid object',
    marbles((m) => {
      const input = m.hot('-a|', {
        a:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI2h456adbfv6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      });
      const subs = '^!';
      const expected = m.cold('-#', {}, new URIError('URI malformed'));
      m.expect(input.pipe(decodeJWT())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
