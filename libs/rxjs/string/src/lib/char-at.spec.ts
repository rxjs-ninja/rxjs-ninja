import { charAt } from '@tinynodes/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';

describe('charAt', () => {
  it(
    'should return the character at the passed position',
    marbles((m) => {
      const input = m.hot('-a-b-c-', { a: 'test', b: 'foo', c: 'a' });
      const expected = m.cold('-a-b-c-', { a: 's', b: 'o', c: '' });
      m.expect(input.pipe(charAt(2))).toBeObservable(expected);
    }),
  );
});
