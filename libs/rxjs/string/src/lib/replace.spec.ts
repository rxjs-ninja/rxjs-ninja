import { of } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';
import { replace } from './replace';

describe('replace', () => {
  it(
    'should replace a string with the passed string pattern',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'RxJS Hero, Angular Hero' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: 'RxJS Ninja, Angular Hero' });
      m.expect(input.pipe(replace('Hero', 'Ninja'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should replace a string with the passed string pattern',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'RxJS Hero, Angular Hero' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: 'RxJS Ninja, Angular Hero' });
      m.expect(input.pipe(replace(of('Hero'), of('Ninja')))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should replace a regex pattern with the passed string pattern',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'RxJS Hero, Angular Hero' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: 'RxJS Ninja, Angular Hero' });
      m.expect(input.pipe(replace(/(?!\w+\s)(\w+)/, 'Ninja'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should replace a regex pattern with the passed string pattern',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'RxJS Hero, Angular Hero' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: 'RxJS Ninja, Angular Hero' });
      m.expect(input.pipe(replace(of(/(?!\w+\s)(\w+)/), of('Ninja')))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
