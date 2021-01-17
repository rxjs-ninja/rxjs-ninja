import { replaceAll } from '@rxjs-ninja/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';
import { of } from 'rxjs';

describe('replaceAll', () => {
  it(
    'should replace a string with the passed string pattern',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'RxJS Hero, Angular Hero' });
      const subs = '^--!';
      const expected = m.cold('-a-|', { a: 'RxJS Ninja, Angular Ninja' });
      m.expect(input.pipe(replaceAll('Hero', 'Ninja'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should replace a string with the passed string pattern Observables',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'RxJS Hero, Angular Hero' });
      const subs = '^--!';
      const expected = m.cold('-a-|', { a: 'RxJS Ninja, Angular Ninja' });
      m.expect(input.pipe(replaceAll(of('Hero'), of('Ninja')))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should replace a regex pattern with the passed regex pattern',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'RxJS Hero, Angular Hero' });
      const subs = '^--!';
      const expected = m.cold('-a-|', { a: 'RxJS Ninja, Angular Ninja' });
      m.expect(input.pipe(replaceAll(/(?!\w+\s)(\w+)/g, 'Ninja'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should replace a regex pattern with the passed regex pattern Observable',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'RxJS Hero, Angular Hero' });
      const subs = '^--!';
      const expected = m.cold('-a-|', { a: 'RxJS Ninja, Angular Ninja' });
      m.expect(input.pipe(replaceAll(of(/(?!\w+\s)(\w+)/g), of('Ninja')))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
