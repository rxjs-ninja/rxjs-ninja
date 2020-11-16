import { repeat } from './repeat';
import { marbles } from 'rxjs-marbles/jest';

describe('repeat', () => {
  it(
    'should repeat the passed string by the number of times passed',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'Hello' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: 'HelloHelloHelloHelloHello' });
      m.expect(input.pipe(repeat(5))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should repeat the passed string by the number of times passed with separator',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 'Hello' });
      const subs = '^--!';
      const expected = m.cold('-z-|', { z: 'Hello, Hello, Hello, Hello, Hello' });
      m.expect(input.pipe(repeat(5, ', '))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
