import { marbles } from 'rxjs-marbles/jest';
import { booleanSome } from './boolean-some';

describe('booleanSome', () => {
  it(
    'should emit true when some boolean in the stream is true',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: false, b: true, c: false });
      const subs = '^------!';
      const expected = m.cold('-------(t|)', { t: true });
      m.expect(input.pipe(booleanSome())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});