import { of } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';
import { charAt } from './char-at';

describe('charAt', () => {
  it(
    'should return an array of characters at the single passed position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'foo', c: 'ab' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: ['s'], y: ['o'], z: [''] });
      m.expect(input.pipe(charAt(2))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the character at the Observable passed position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'foo', c: 'a' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: ['s'], y: ['o'], z: [''] });
      m.expect(input.pipe(charAt(of(2)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an array of characters at the array of passed position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'foo', c: 'ab' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: ['t', 's'], y: ['f', 'o'], z: ['a', ''] });
      m.expect(input.pipe(charAt([0, 2]))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an array of characters at the Set of passed position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'foo', c: 'ab' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: ['t', 's'], y: ['f', 'o'], z: ['a', ''] });
      m.expect(input.pipe(charAt(new Set([0, 2])))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an array of characters at the array of passed position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'foo', c: 'ab' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: ['t', 's'], y: ['f', 'o'], z: ['a', ''] });
      m.expect(input.pipe(charAt(of([0, 2])))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
