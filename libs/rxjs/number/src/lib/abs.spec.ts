import { marbles } from 'rxjs-marbles/jest';
import { abs } from './math';

describe('abs', () => {
  it(
    'should emit the absolute value',
    marbles((m) => {
      const input = m.hot('-a-|', { a: -4 });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: 4 });
      m.expect(input.pipe(abs())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});