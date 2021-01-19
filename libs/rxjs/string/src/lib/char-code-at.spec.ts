import { charCodeAt } from '@rxjs-ninja/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';
import { of } from 'rxjs';

describe('charCodeAt', () => {
  it(
    'should return the character code at the passed position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'foo', c: 'a' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [116], y: [102], z: [97] });
      m.expect(input.pipe(charCodeAt(0))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the character code at the array of passed position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'foo', c: 'a' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [116, 101], y: [102, 111], z: [97, NaN] });
      m.expect(input.pipe(charCodeAt([0, 1]))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the character code at the Observable passed position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'foo', c: 'a' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [115], y: [111], z: [NaN] });
      m.expect(input.pipe(charCodeAt(of(2)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the character code at the Observable array of passed position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'foo', c: 'a' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [116, 101], y: [102, 111], z: [97, NaN] });
      m.expect(input.pipe(charCodeAt(of([0, 1])))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
