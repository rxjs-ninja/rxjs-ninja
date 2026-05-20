import { marbles } from 'rxjs-marbles/jest';
import { asciiLowerCase } from './ascii-lower-case';

describe('asciiLowerCase', () => {
  it(
    'should lowercase ASCII letters only',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'AbC' });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: 'abc' });
      m.expect(input.pipe(asciiLowerCase())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});