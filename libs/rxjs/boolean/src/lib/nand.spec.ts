import { marbles } from 'rxjs-marbles/jest';
import { nand } from './nand';

describe('nand', () => {
  it(
    'should emit the logical NAND of source and input',
    marbles((m) => {
      const input = m.hot('-a-b-|', { a: true, b: false });
      const subs = '^----!';
      const expected = m.cold('-f-t-|', { f: false, t: true });
      m.expect(input.pipe(nand(true))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});