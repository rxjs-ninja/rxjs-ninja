import { marbles } from 'rxjs-marbles/jest';
import { intlNumberFormatParts } from './intl-number-format';

describe('intlNumberFormatParts', () => {
  it(
    'should emit Intl number format parts',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 1000 });
      const subs = '^--!';
      const expected = m.cold('-x-|', {
        x: expect.arrayContaining([expect.objectContaining({ type: 'integer' })]),
      });
      m.expect(input.pipe(intlNumberFormatParts('en-US'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});