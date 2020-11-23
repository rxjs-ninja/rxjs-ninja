import { marbles } from 'rxjs-marbles';
import { some } from '@rxjs-ninja/rxjs-array';

describe('some', () => {
  it(
    'should return true if the array contains values that pass the predicate',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['RxJS', 'Ninja'], b: ['RxJS', 'Rocks'], c: ['Fizz', 'Buzz'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: true, y: true, z: false });
      m.expect(input.pipe(some((v) => v === 'RxJS'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
