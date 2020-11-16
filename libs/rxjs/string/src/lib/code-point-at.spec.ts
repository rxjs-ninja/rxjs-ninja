import { codePointAt } from '@tinynodes/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';

describe('codePointAt', () => {
  it(
    'should return the code point at the passed position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: '☃', b: '★', c: '♲' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 9731, y: 9733, z: 9842 });
      m.expect(input.pipe(codePointAt(0))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
