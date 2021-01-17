import { slice } from '@rxjs-ninja/rxjs-string';
import { marbles } from 'rxjs-marbles/jest';
import { of } from 'rxjs';

describe('slice', () => {
  it(
    'should return a sliced string from the start index',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'RxJS Ninja' });
      const subs = '^--!';
      const expected = m.cold('-a-|', { a: 'RxJS' });
      m.expect(input.pipe(slice(0, 4))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a sliced string from the start index',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'RxJS Ninja' });
      const subs = '^--!';
      const expected = m.cold('-a-|', { a: 'RxJS' });
      m.expect(input.pipe(slice(of(0), of(4)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a sliced string from the start index to the length value',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'RxJS Ninja' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: 'Ninja' });
      m.expect(input.pipe(slice(5))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a sliced string from the start index to the length value',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'RxJS Ninja' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: 'Ninja' });
      m.expect(input.pipe(slice(of(5)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
