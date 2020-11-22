import { charCodeAt } from '@rxjs-ninja/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';

describe('charCodeAt', () => {
  it(
    'should return the character code at the passed position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'foo', c: 'a' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 116, y: 102, z: 97 });
      m.expect(input.pipe(charCodeAt(0))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
