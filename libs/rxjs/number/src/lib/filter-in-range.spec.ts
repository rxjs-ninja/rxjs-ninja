import { filterInRange } from '@tinynodes/rxjs-number';
import { marbles } from 'rxjs-marbles/jest';

describe('filterInRange', () => {
  it(
    'should filter values including the boundary values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-', { a: -1, b: 0, c: 1, d: 2, e: 3.14 });
      const expected = m.cold('---b-c-d---', { b: 0, c: 1, d: 2 });
      m.expect(input.pipe(filterInRange(0, 2))).toBeObservable(expected);
    }),
  );

  it(
    'should filter values excluding the boundary values',
    marbles((m) => {
      const input = m.hot('-a-b-c-d-e-', { a: -1, b: 0, c: 1, d: 2, e: 3.14 });
      const expected = m.cold('-----c-----', { b: 0, c: 1, d: 2 });
      m.expect(input.pipe(filterInRange(0, 2, true))).toBeObservable(expected);
    }),
  );
});
