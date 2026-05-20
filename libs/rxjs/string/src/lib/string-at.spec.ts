import { marbles } from 'rxjs-marbles/jest';
import { stringAt } from './string-at';

describe('stringAt', () => {
  it(
    'should return the character at the given index',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'RxJS' });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: 'R' });
      m.expect(input.pipe(stringAt(0))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});