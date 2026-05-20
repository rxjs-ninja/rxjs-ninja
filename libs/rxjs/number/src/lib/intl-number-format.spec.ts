import { marbles } from 'rxjs-marbles/jest';
import { intlNumberFormat } from './intl-number-format';

describe('intlNumberFormat', () => {
  it(
    'should format numbers for a locale',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 1000 });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: '1,000' });
      m.expect(input.pipe(intlNumberFormat('en-US'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});