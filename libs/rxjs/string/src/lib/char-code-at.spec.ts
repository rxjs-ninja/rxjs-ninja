import { charCodeAt } from '@tinynodes/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';

describe('charCodeAt', () => {
  it(
    'should return the code character at the passed position',
    marbles((m) => {
      const input = m.hot('-a-b-c-', { a: 'test', b: 'foo', c: 'a' });
      const expected = m.cold('-a-b-c-', { a: 115, b: 102, c: 97 });
      m.expect(input.pipe(charCodeAt(0))).toBeObservable(expected);
    }),
  );
});
