import { filterOutOfRange } from '@tinynodes/rxjs-number';
import { marbles } from 'rxjs-marbles/jest';

describe('filterOutOfRange', () => {
  it(
    'should filter values excluding the boundary values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: -1, b: 0, c: 1, d: 2, e: 3.14 });
      const subs = '^----------!';
      const expected = m.cold('-a-------e-|', { a: -1, e: 3.14 });
      m.expect(input.pipe(filterOutOfRange(0, 2))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should filter values including the boundary values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-|', { a: -1, b: 0, c: 1, d: 2, e: 3.14 });
      const subs = '^----------!';
      const expected = m.cold('-a-b---d-e-|', { a: -1, b: 0, d: 2, e: 3.14 });
      m.expect(input.pipe(filterOutOfRange(0, 2, true))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
