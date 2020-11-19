import { search } from '@tinynodes/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';

describe('search', () => {
  it(
    'should return a index match for start of a string',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'Mary had a little lamb' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: 11 });
      m.expect(input.pipe(search('little'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a index regex match for start of a string',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'Mary had a Little Lamb' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: 18 });
      m.expect(input.pipe(search(/lamb/gi))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
