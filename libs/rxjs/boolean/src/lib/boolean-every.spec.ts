import { marbles } from 'rxjs-marbles/jest';
import { booleanEvery } from './boolean-every';

describe('booleanEvery', () => {
  it(
    'should emit true when every boolean in the stream is true',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: true, b: true, c: true });
      const subs = '^------!';
      const expected = m.cold('-------(t|)', { t: true });
      m.expect(input.pipe(booleanEvery())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});