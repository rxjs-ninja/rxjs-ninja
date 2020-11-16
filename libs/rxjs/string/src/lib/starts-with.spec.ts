import { startsWith } from '@tinynodes/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';

describe('startsWith', () => {
  it(
    'should return boolean value of string starting with passed character',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'testing', c: 'gone' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: true, y: true, z: false });
      m.expect(input.pipe(startsWith('t'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return boolean value of string starting with passed character from start position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'testing', c: 'gone' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: false, y: false, z: true });
      m.expect(input.pipe(startsWith('o', 1))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
