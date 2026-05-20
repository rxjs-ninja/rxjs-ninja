import { marbles } from 'rxjs-marbles/jest';
import { booleanNone } from './boolean-none';

describe('booleanNone', () => {
  it(
    'should emit true when no boolean in the stream is true',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: false, b: true, c: false });
      const subs = '^------!';
      const expected = m.cold('-------(f|)', { f: false });
      m.expect(input.pipe(booleanNone())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});