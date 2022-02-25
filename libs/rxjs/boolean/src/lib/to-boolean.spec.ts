import { marbles } from 'rxjs-marbles/jest';
import { toBoolean } from './to-boolean';

describe('toBoolean', () => {
  it(
    'should return a boolean value from string',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: '', b: 'RxJS', c: 'Ninja' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: false, y: true, z: true });
      m.expect(input.pipe(toBoolean())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a boolean value from string with predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: '', b: 'RxJS', c: 'Ninja' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: false, y: true, z: false });
      m.expect(input.pipe(toBoolean((v) => Boolean(v) && v.length < 5))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a boolean value from number',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: -1, b: 0, c: 1 });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: true, y: false, z: true });
      m.expect(input.pipe(toBoolean())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a boolean value from number with predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: -1, b: 0, c: 1 });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: true, y: true, z: false });
      m.expect(input.pipe(toBoolean((v) => v <= 0))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
