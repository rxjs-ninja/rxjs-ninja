import { marbles } from 'rxjs-marbles';
import { reverse } from './reverse';

describe('reverse', () => {
  it(
    'should return a reversed array',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['RxJS', 'Ninja'], b: ['RxJS', 'Rocks'], c: ['Fizz', 'Buzz'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: ['Ninja', 'RxJS'], y: ['Rocks', 'RxJS'], z: ['Buzz', 'Fizz'] });
      m.expect(input.pipe(reverse())).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
