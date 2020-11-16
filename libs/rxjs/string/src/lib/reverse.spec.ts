import { reverse } from '@tinynodes/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';

describe('reverse', () => {
  it(
    'should reverse a passed string',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'Hello', b: 'Testing', c: 'Foobar' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'olleH', y: 'gnitseT', z: 'rabooF' });
      m.expect(input.pipe(reverse())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
