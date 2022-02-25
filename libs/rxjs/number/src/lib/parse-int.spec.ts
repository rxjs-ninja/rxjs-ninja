import { of } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';
import { parseInt } from './parse-int';

describe('parseInt', () => {
  it(
    'should return a correctly parsed integer value',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: '-1', b: '0', c: '1', d: '2.3', e: '42' });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', { w: -1, v: 0, x: 1, y: 2, z: 42 });
      m.expect(input.pipe(parseInt())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a correctly parsed integer value or NaN',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: '-1', b: '0', c: '1', d: '2.3', e: 'Ninja' });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', { w: -1, v: 0, x: 1, y: 2, z: NaN });
      m.expect(input.pipe(parseInt(10))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a correctly parsed hex value with radix 16',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-|', { a: '0', b: '60', c: 'ff', d: '42' });
      const subs = '^--------!';
      const expected = m.cold('-w-x-y-z-|', { w: 0, x: 96, y: 255, z: 66 });
      m.expect(input.pipe(parseInt(16))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return a correctly parsed hex value or NaN with Observable radix 16',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-|', { a: '0', b: '60', c: 'ff', d: 'Ninja' });
      const subs = '^--------!';
      const expected = m.cold('-w-x-y-z-|', { w: 0, x: 96, y: 255, z: NaN });
      m.expect(input.pipe(parseInt(16))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return parsed integer values with radix as Observable',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-|', { a: '0', b: '60', c: 'ff', d: 'Ninja' });
      const subs = '^--------!';
      const expected = m.cold('-w-x-y-z-|', { w: 0, x: 96, y: 255, z: NaN });
      m.expect(input.pipe(parseInt(of(16)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
