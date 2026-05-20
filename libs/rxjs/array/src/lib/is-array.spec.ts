import { marbles } from 'rxjs-marbles';
import { isArray } from './is-array';

describe('isArray', () => {
  it(
    'should emit true for arrays and false otherwise',
    marbles((m) => {
      const input = m.hot('-a-b-|', { a: [1], b: 'x' });
      const subs = '^----!';
      const expected = m.cold('-t-f-|', { t: true, f: false });
      m.expect(input.pipe(isArray())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});