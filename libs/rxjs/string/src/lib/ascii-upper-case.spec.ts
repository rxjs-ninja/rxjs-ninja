import { marbles } from 'rxjs-marbles/jest';
import { asciiUpperCase } from './ascii-upper-case';

describe('asciiUpperCase', () => {
  it(
    'should uppercase ASCII letters only',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'AbC' });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: 'ABC' });
      m.expect(input.pipe(asciiUpperCase())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});