import { parseInt } from '@rxjs-ninja/rxjs-number';
import { marbles } from 'rxjs-marbles/jest';

describe('parseInt', () => {
  it(
    'should return parsed integer values and filter NaN values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: '-1', b: '0', c: '1', d: '2.3', e: 'Ninja' });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y---|', { w: -1, v: 0, x: 1, y: 2 });
      m.expect(input.pipe(parseInt())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return parsed integer values and return NaN values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: '-1', b: '0', c: '1', d: '2.3', e: 'Ninja' });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', { w: -1, v: 0, x: 1, y: 2, z: NaN });
      m.expect(input.pipe(parseInt(10, true))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return parsed integer values with radix',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-|', { a: '0', b: '60', c: 'ff', d: 'Ninja' });
      const subs = '^--------!';
      const expected = m.cold('-w-x-y---|', { w: 0, x: 96, y: 255 });
      m.expect(input.pipe(parseInt(16))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return parsed integer values with radix and filter NaN values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-|', { a: '0', b: '60', c: 'ff', d: 'Ninja' });
      const subs = '^--------!';
      const expected = m.cold('-w-x-y-z-|', { w: 0, x: 96, y: 255, z: NaN });
      m.expect(input.pipe(parseInt(16, true))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
