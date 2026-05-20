import { marbles } from 'rxjs-marbles';
import { reduceRight } from './reduce-right';

describe('reduceRight', () => {
  it(
    'should reduce the array from the right',
    marbles((m) => {
      const input = m.hot('-a-|', { a: [1, 2, 3] });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: '321' });
      m.expect(input.pipe(reduceRight((acc, n) => `${acc}${n}`, ''))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});