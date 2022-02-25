import { of } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';
import { substring } from './substring';

describe('substring', () => {
  it(
    'should return a substring string from the start and end value',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'Mary had a little lamb' });
      const subs = '^--!';
      const expected = m.cold('-a-|', { a: 'Mary' });
      m.expect(input.pipe(substring(0, 4))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a substring string from the start and end value',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'Mary had a little lamb' });
      const subs = '^--!';
      const expected = m.cold('-a-|', { a: 'had a little lamb' });
      m.expect(input.pipe(substring(5))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a substring string from the start and end Observable value',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'Mary had a little lamb' });
      const subs = '^--!';
      const expected = m.cold('-a-|', { a: 'Mary' });
      m.expect(input.pipe(substring(of(0), of(4)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a substring string from the start and end Observable value',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'Mary had a little lamb' });
      const subs = '^--!';
      const expected = m.cold('-a-|', { a: 'had a little lamb' });
      m.expect(input.pipe(substring(of(5)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
