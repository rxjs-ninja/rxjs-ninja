import { marbles } from 'rxjs-marbles/jest';
import { sign } from './math';

describe('sign', () => {
  it(
    'should emit the sign of each number',
    marbles((m) => {
      const input = m.hot('-a-|', { a: -1 });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: -1 });
      m.expect(input.pipe(sign())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});