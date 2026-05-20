import { marbles } from 'rxjs-marbles/jest';
import { intlCollatorCompare } from './intl-collator';

describe('intlCollatorCompare', () => {
  it(
    'should compare strings using Intl.Collator',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'b' });
      const subs = '^--!';
      const expected = m.cold('-p-|', { p: 1 });
      m.expect(input.pipe(intlCollatorCompare('a', 'en'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});