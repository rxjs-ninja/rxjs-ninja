import { of } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';
import { filterStartsWith } from './filter-starts-with';

describe('filterStartsWith', () => {
  it(
    'should return string value of string starting with passed character',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'testing', c: 'gone' });
      const subs = '^------!';
      const expected = m.cold('-----z-|', { z: 'gone' });
      m.expect(input.pipe(filterStartsWith('g'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return string value of string starting with passed character',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'testing', c: 'gone' });
      const subs = '^------!';
      const expected = m.cold('-----z-|', { z: 'gone' });
      m.expect(input.pipe(filterStartsWith(of('g')))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return string value of string starting with passed character after non-zero index position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'testing', c: 'amazing' });
      const subs = '^------!';
      const expected = m.cold('---y-z-|', { y: 'testing', z: 'amazing' });
      m.expect(input.pipe(filterStartsWith('i', 4))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return string value of string starting with passed character after non-zero index position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'testing', c: 'amazing' });
      const subs = '^------!';
      const expected = m.cold('---y-z-|', { y: 'testing', z: 'amazing' });
      m.expect(input.pipe(filterStartsWith(of('i'), of(4)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
