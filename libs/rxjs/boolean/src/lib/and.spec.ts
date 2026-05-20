import { marbles } from 'rxjs-marbles/jest';
import { and } from './and';

describe('and', () => {
  it(
    'should emit the logical AND of source and input',
    marbles((m) => {
      const input = m.hot('-a-b-|', { a: true, b: false });
      const subs = '^----!';
      const expected = m.cold('-t-f-|', { t: true, f: false });
      m.expect(input.pipe(and(true))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});