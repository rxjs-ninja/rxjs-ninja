import { codePointAt } from '@tinynodes/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';

describe('codePointAt', () => {
  it(
    'should return the code character at the passed position',
    marbles((m) => {
      const input = m.hot('-a-b-c-', { a: '☃', b: '★', c: '♲' });
      const expected = m.cold('-a-b-c-', { a: 9731, b: 9733, c: 9842 });
      m.expect(input.pipe(codePointAt(0))).toBeObservable(expected);
    }),
  );
});
