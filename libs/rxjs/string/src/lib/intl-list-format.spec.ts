import { marbles } from 'rxjs-marbles/jest';
import { intlListFormat } from './intl-list-format';

describe('intlListFormat', () => {
  it(
    'should format a list for a locale',
    marbles((m) => {
      const input = m.hot('-a-|', { a: ['a', 'b', 'c'] });
      const subs = '^--!';
      const expected = m.cold('-l-|', { l: 'a, b, and c' });
      m.expect(input.pipe(intlListFormat('en'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});