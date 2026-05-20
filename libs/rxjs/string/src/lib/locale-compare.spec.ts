import { marbles } from 'rxjs-marbles/jest';
import { localeCompare } from './locale-compare';

describe('localeCompare', () => {
  it(
    'should compare strings and emit the sort order',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'b' });
      const subs = '^--!';
      const expected = m.cold('-p-|', { p: 1 });
      m.expect(input.pipe(localeCompare('a'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});