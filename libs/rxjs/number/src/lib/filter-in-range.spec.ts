import { filterInRange } from '@rxjs-ninja/rxjs-number';
import { marbles } from 'rxjs-marbles/jest';
import { of } from 'rxjs';

describe('filterInRange', () => {
  it(
    'should filter values including the boundary values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: -1, b: 0, c: 1, d: 2, e: 3.14 });
      const subs = '^----------!';
      const expected = m.cold('---b-c-d---|', { b: 0, c: 1, d: 2 });
      m.expect(input.pipe(filterInRange(0, 2))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should filter values including the Observable boundary values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: -1, b: 0, c: 1, d: 2, e: 3.14 });
      const subs = '^----------!';
      const expected = m.cold('---b-c-d---|', { b: 0, c: 1, d: 2 });
      m.expect(input.pipe(filterInRange(of(0), of(2)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should filter values excluding the boundary values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: -1, b: 0, c: 1, d: 2, e: 3.14 });
      const subs = '^----------!';
      const expected = m.cold('-----c-----|', { c: 1 });
      m.expect(input.pipe(filterInRange(0, 2, true))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should filter values excluding the Observable boundary values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: -1, b: 0, c: 1, d: 2, e: 3.14 });
      const subs = '^----------!';
      const expected = m.cold('-----c-----|', { c: 1 });
      m.expect(input.pipe(filterInRange(of(0), of(2), of(true)))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should filter values including the boundary values with negative values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: -1, b: 0, c: 1, d: 2, e: 3.14 });
      const subs = '^----------!';
      const expected = m.cold('-a-b-------|', { a: -1, b: 0 });
      m.expect(input.pipe(filterInRange(-10, 0))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should filter values excluding the boundary values with negative values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: -1, b: 0, c: 1, d: 2, e: 3.14 });
      const subs = '^----------!';
      const expected = m.cold('-a---------|', { a: -1 });
      m.expect(input.pipe(filterInRange(-10, 0, true))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
