import { of } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';
import { filterEndsWith } from './filter-ends-with';

describe('filterEndsWith', () => {
  it(
    'should return string value of string ending with passed character',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'testing', c: 'gone' });
      const subs = '^------!';
      const expected = m.cold('---y---|', { y: 'testing' });
      m.expect(input.pipe(filterEndsWith('g'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return string value of string ending with passed character',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'testing', c: 'gone' });
      const subs = '^------!';
      const expected = m.cold('---y---|', { y: 'testing' });
      m.expect(input.pipe(filterEndsWith(of('g')))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return string value of string ending with passed character at non-zero index position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'testing', c: 'gone' });
      const subs = '^------!';
      const expected = m.cold('-x-y---|', { x: 'test', y: 'testing' });
      m.expect(input.pipe(filterEndsWith('t', 4))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return string value of string ending with passed character at non-zero index position',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: 'test', b: 'testing', c: 'gone' });
      const subs = '^------!';
      const expected = m.cold('-x-y---|', { x: 'test', y: 'testing' });
      m.expect(input.pipe(filterEndsWith(of('t'), of(4)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
