import { padEnd, padStart } from '@rxjs-ninja/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';

describe('padStart', () => {
  it(
    'should pad a string at the start by a specified length',
    marbles((m) => {
      const input = m.hot('-a-|', { a: '12345' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: '     12345' });
      m.expect(input.pipe(padStart(10))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should pad a string at the start by a specified length with fill string',
    marbles((m) => {
      const input = m.hot('-a-|', { a: '12345' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: 'XXXXX12345' });
      m.expect(input.pipe(padStart(10, 'X'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});

describe('padEnd', () => {
  it(
    'should pad a string at the end by a specified length',
    marbles((m) => {
      const input = m.hot('-a-|', { a: '12345' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: '12345     ' });
      m.expect(input.pipe(padEnd(10))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should pad a string at the end by a specified length with fill string',
    marbles((m) => {
      const input = m.hot('-a-|', { a: '12345' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: '12345XXXXX' });
      m.expect(input.pipe(padEnd(10, 'X'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
