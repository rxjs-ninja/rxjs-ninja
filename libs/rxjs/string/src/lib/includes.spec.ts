import { includes } from '@tinynodes/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';

describe('includes', () => {
  it(
    'should return boolean value of string including a passed string',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'testing', c: 'gone' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: true, y: true, z: false });
      m.expect(input.pipe(includes('est'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
