import { endsWith } from '@rxjs-ninja/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';

describe('endsWith', () => {
  it(
    'should return boolean value of string ending with passed character',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'testing', c: 'gone' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: false, y: true, z: false });
      m.expect(input.pipe(endsWith('g'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return boolean value of string ending with passed character at non-zero index position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'testing', c: 'gone' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: true, y: true, z: false });
      m.expect(input.pipe(endsWith('t', 4))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
