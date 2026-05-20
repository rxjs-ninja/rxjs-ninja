import { marbles } from 'rxjs-marbles/jest';
import { intlNumberFormatRange } from './intl-number-format';

describe('intlNumberFormatRange', () => {
  it(
    'should format a numeric range for a locale',
    marbles((m) => {
      const input = m.hot('-a-|', { a: [1, 5] });
      const subs = '^--!';
      const expected = m.cold('-r-|', { r: '1–5' });
      m.expect(input.pipe(intlNumberFormatRange('en-US'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});