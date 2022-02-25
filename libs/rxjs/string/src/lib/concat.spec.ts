import { of } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';
import { concat } from './concat';

describe('concat', () => {
  it(
    'should concatenate a new string to the source string',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'pass', c: 'moo' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'testing', y: 'passing', z: 'mooing' });
      m.expect(input.pipe(concat('ing'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should concatenate a new string to the source string',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'pass', c: 'moo' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'testing', y: 'passing', z: 'mooing' });
      m.expect(input.pipe(concat(of('ing')))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should concatenate a new array of strings to the source string',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'pass', c: 'moo' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'testing is fun', y: 'passing is fun', z: 'mooing is fun' });
      m.expect(input.pipe(concat(['ing', ' ', 'is fun']))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should concatenate a new observable array of strings to the source string',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'pass', c: 'moo' });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: 'testing is fun', y: 'passing is fun', z: 'mooing is fun' });
      m.expect(input.pipe(concat(of(['ing', ' ', 'is fun'])))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
