import { of } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';
import { div } from './div';

describe('div', () => {
  it(
    'should return the value divided by 2',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: 2, b: 6, c: 10, d: 18, e: 20 });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', { w: 1, v: 3, x: 5, y: 9, z: 10 });
      m.expect(input.pipe(div(2))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return the value divided by 2 Observable',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: 2, b: 6, c: 10, d: 18, e: 20 });
      const subs = '^----------!';
      const expected = m.cold('-w-v-x-y-z-|', { w: 1, v: 3, x: 5, y: 9, z: 10 });
      m.expect(input.pipe(div(of(2)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an error when 0 is passed',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: 2, b: 6, c: 10, d: 18, e: 20 });
      const subs = '^!';
      const expected = m.cold('-#', {}, 'div operator cannot divide by 0');
      m.expect(input.pipe(div(0))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
