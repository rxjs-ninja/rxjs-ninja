import { lastIndexOf } from '@rxjs-ninja/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';

describe('lastIndexOf', () => {
  it(
    'should return last index of where a string is found within another string',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'foobar barfoo', b: 'eat food', c: 'test' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 10, y: 4, z: -1 });
      m.expect(input.pipe(lastIndexOf('foo'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return last index of where a string is found within another string with start value',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'foobar barfoo', b: 'eat food', c: 'test' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 0, y: -1, z: -1 });
      m.expect(input.pipe(lastIndexOf('foo', 0))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
