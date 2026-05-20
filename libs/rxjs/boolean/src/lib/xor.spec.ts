import { marbles } from 'rxjs-marbles/jest';
import { xor } from './xor';

describe('xor', () => {
  it(
    'should emit the logical XOR of source and input',
    marbles((m) => {
      const input = m.hot('-a-b-|', { a: true, b: false });
      const subs = '^----!';
      const expected = m.cold('-f-t-|', { f: false, t: true });
      m.expect(input.pipe(xor(true))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});