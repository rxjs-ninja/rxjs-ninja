import { marbles } from 'rxjs-marbles/jest';
import { or } from './or';

describe('or', () => {
  it(
    'should emit the logical OR of source and input',
    marbles((m) => {
      const input = m.hot('-a-b-|', { a: true, b: false });
      const subs = '^----!';
      const expected = m.cold('-t-f-|', { t: true, f: false });
      m.expect(input.pipe(or(false))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});